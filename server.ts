import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

const SAHABAT_BK_SYSTEM_INSTRUCTION = `Kamu adalah Sahabat BK AI, asisten bimbingan dan konseling digital yang ramah, empatik, bijaksana, dan mendukung perkembangan siswa SMP kelas VII, VIII, dan IX di Indonesia.

Peranmu:
1. Membantu siswa mengenali potensi, minat, bakat, dan cita-cita.
2. Memberikan informasi pilihan pendidikan setelah SMP (SMA, SMK, MA, dan jalur pendidikan lanjutan secara objektif).
3. Membantu siswa mengeksplorasi profesi dan dunia kerja.
4. Memberikan motivasi dan strategi belajar yang praktis untuk usia SMP.
5. Membantu siswa menghadapi tantangan pertemanan dan kehidupan sekolah dengan sehat.
6. Memberikan informasi berdasarkan sumber yang dapat dipercaya.
7. Mendorong siswa berdiskusi dengan guru BK ketika membutuhkan pendampingan lebih lanjut.

Aturan komunikasi:
- Gunakan bahasa Indonesia yang santai, sopan, hangat, dan mudah dipahami anak SMP.
- Jangan menghakimi atau merendahkan siswa.
- Berikan jawaban bertahap dan tidak terlalu panjang (maksimal sekitar 3-4 paragraf pendek atau poin ringkas agar nyaman dibaca di ponsel).
- Gunakan contoh nyata yang dekat dengan kehidupan siswa SMP.
- Ajukan pertanyaan reflektif apabila diperlukan.
- Jangan memaksakan satu pilihan karier.
- Berikan beberapa alternatif pilihan pendidikan dan profesi.
- Jangan mengklaim mengetahui kepribadian atau bakat siswa hanya dari satu percakapan.
- Bedakan informasi yang sudah terverifikasi dengan saran umum.
- Jangan mengarang informasi tentang sekolah, beasiswa, persyaratan, dan jadwal penerimaan. Jika siswa menanyakan jadwal atau syarat resmi terbaru, sarankan untuk mengecek situs resmi pemerintah/dinas pendidikan terkait atau bertanya langsung kepada Guru BK.

KEAMANAN DAN ETIKA (WAJIB DIPATUHI):
- Jangan meminta password, alamat rumah lengkap, nomor identitas (NIK/NISN), nomor HP, atau data pribadi sensitif.
- Jangan memberikan diagnosis gangguan mental atau diagnosis psikologis.
- Jangan menggantikan peran guru BK, orang tua, konselor profesional, atau tenaga kesehatan.
- Jika siswa menyampaikan perundungan (bullying), kekerasan, pelecehan, ancaman, atau masalah serius, tanggapi dengan penuh empati dan arahkan siswa untuk segera berbicara dengan guru BK, orang tua, atau orang dewasa tepercaya di sekolah/rumah.
- Jika siswa mengungkapkan keinginan menyakiti diri sendiri atau orang lain, prioritaskan keselamatan. Sampaikan kepedulian dengan hangat, dorong siswa segera mencari pendampingan orang dewasa tepercaya (orang tua, guru BK) serta hubungi bantuan profesional atau layanan darurat setempat (misalnya Layanan SEJIWA 119 ext. 8 atau 112/119 di Indonesia). Jangan membiarkan siswa menghadapi situasi tersebut sendirian.
- Jangan menjanjikan kerahasiaan mutlak.
- Jangan mendorong ketergantungan emosional kepada chatbot.

Akhiri percakapan dengan dukungan positif atau satu langkah konkret yang bisa dilakukan siswa hari ini.`;

function detectTopicCategory(text: string): string {
  const lower = text.toLowerCase();
  if (/(sma|smk|ma\b|sekolah|jurusan|kuliah|masuk|pendaftaran|beasiswa)/.test(lower)) {
    return 'Pendidikan Lanjutan';
  }
  if (/(cita-cita|profesi|kerja|karier|karir|minat|bakat|riasec|hobi)/.test(lower)) {
    return 'Eksplorasi Karier';
  }
  if (/(belajar|matematika|nilai|ujian|tugas|konsentrasi|malas|jadwal)/.test(lower)) {
    return 'Strategi Belajar';
  }
  if (/(teman|ejek|bully|perundungan|sahabat|berantem|pertemanan|sosial)/.test(lower)) {
    return 'Pertemanan & Sosial';
  }
  if (/(percaya diri|stres|cemas|sedih|marah|bingung|motivasi|orang tua)/.test(lower)) {
    return 'Pengembangan Diri';
  }
  return 'Konsultasi Umum';
}

interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
  studentContext?: {
    firstName?: string;
    grade?: string;
  };
}

let cachedAiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!cachedAiClient) {
    cachedAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedAiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({ ok: true, aiConfigured: hasKey });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const body = (req.body || {}) as ChatRequestBody;
      const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

      if (!rawMessage) {
        res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
        return;
      }
      if (rawMessage.length > 2000) {
        res.status(400).json({ error: 'Pesan terlalu panjang. Maksimal 2000 karakter.' });
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          error: 'Layanan Sahabat BK AI belum aktif karena GEMINI_API_KEY belum tersedia di server. Silakan tambahkan secret GEMINI_API_KEY pada pengaturan environment.',
        });
        return;
      }

      const rawHistory = Array.isArray(body.history) ? body.history : [];
      const sanitizedHistory: ChatHistoryItem[] = rawHistory
        .filter((item): item is ChatHistoryItem => {
          return (
            typeof item === 'object' &&
            item !== null &&
            (item.role === 'user' || item.role === 'model') &&
            typeof item.content === 'string' &&
            item.content.trim().length > 0
          );
        })
        .slice(-14);

      const gradeInfo = body.studentContext?.grade && ['VII', 'VIII', 'IX'].includes(body.studentContext.grade)
        ? `Siswa saat ini berada di kelas ${body.studentContext.grade} SMP.`
        : '';
      const nameInfo = body.studentContext?.firstName
        ? `Nama panggilan siswa: ${String(body.studentContext.firstName).slice(0, 40)}.`
        : '';
      const contextBlock = [gradeInfo, nameInfo].filter(Boolean).join(' ');

      const fullInstruction = contextBlock
        ? `${SAHABAT_BK_SYSTEM_INSTRUCTION}\n\nKonteks siswa saat ini (hanya gunakan seperlunya untuk menyapa dengan hangat): ${contextBlock}`
        : SAHABAT_BK_SYSTEM_INSTRUCTION;

      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        config: {
          systemInstruction: fullInstruction,
        },
        history: sanitizedHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.content.slice(0, 4000) }],
        })),
      });

      const response = await chat.sendMessage({ message: rawMessage });
      const replyText = (response.text || '').trim();

      if (!replyText) {
        res.status(502).json({ error: 'Maaf, Sahabat BK AI tidak menghasilkan jawaban. Coba ajukan pertanyaanmu sekali lagi ya.' });
        return;
      }

      res.json({
        reply: replyText,
        topicCategory: detectTopicCategory(rawMessage),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Gemini API error:', message);

      if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error: 'Layanan AI sedang menerima banyak pertanyaan sekaligus. Tunggu beberapa saat lalu coba kirim lagi ya.',
        });
        return;
      }
      if (message.includes('403') || message.includes('PERMISSION_DENIED') || message.includes('API_KEY_INVALID')) {
        res.status(502).json({
          error: 'Konfigurasi kunci API Gemini belum valid di server. Mohon periksa GEMINI_API_KEY di panel Secrets.',
        });
        return;
      }

      res.status(500).json({
        error: 'Terjadi kendala saat menghubungi Sahabat BK AI. Silakan coba lagi sebentar lagi.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BICARA BK server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
