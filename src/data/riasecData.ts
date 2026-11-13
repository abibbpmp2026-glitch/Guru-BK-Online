import { RiasecCode } from '../types/bicara';

export interface RiasecQuestion {
  id: number;
  code: RiasecCode;
  statement: string;
}

export interface RiasecProfileInfo {
  code: RiasecCode;
  name: string;
  indonesianTitle: string;
  tagline: string;
  description: string;
  schoolActivities: string[];
  educationPaths: string[];
  exampleProfessions: string[];
  selfDevRecommendations: string[];
  accentHex: string;
}

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // Realistic (4)
  { id: 1, code: 'R', statement: 'Saya senang membongkar pasang peralatan rumah tangga atau sepeda untuk tahu cara kerjanya.' },
  { id: 2, code: 'R', statement: 'Saya lebih suka kegiatan praktik di bengkel, kebun, atau laboratorium daripada hanya duduk mendengar ceramah.' },
  { id: 3, code: 'R', statement: 'Saya tertarik belajar mengoperasikan alat teknik, kamera, atau perangkat keras komputer.' },
  { id: 4, code: 'R', statement: 'Saya menyukai kegiatan luar ruangan seperti berkemah, berkebun, atau olahraga lapangan.' },

  // Investigative (4)
  { id: 5, code: 'I', statement: 'Saya suka memecahkan teka-teki logika, soal hitungan menantang, atau misteri ilmiah.' },
  { id: 6, code: 'I', statement: 'Ketika melihat fenomena alam atau teknologi baru, saya terdorong mencari tahu alasan di baliknya.' },
  { id: 7, code: 'I', statement: 'Saya menikmati melakukan percobaan sains atau mengamati data untuk menarik kesimpulan.' },
  { id: 8, code: 'I', statement: 'Saya gemar membaca buku atau menonton tayangan dokumenter tentang pengetahuan, antariksa, atau kesehatan.' },

  // Artistic (4)
  { id: 9, code: 'A', statement: 'Saya senang mengekspresikan ide lewat menggambar, desain visual, fotografi, atau membuat video.' },
  { id: 10, code: 'A', statement: 'Saya suka menulis cerita, puisi, lirik lagu, atau merancang konsep kreatif untuk mading sekolah.' },
  { id: 11, code: 'A', statement: 'Saya peka terhadap perpaduan warna, musik, tata letak poster, atau keindahan karya seni.' },
  { id: 12, code: 'A', statement: 'Saya merasa bersemangat jika diberi kebebasan berkreasi tanpa aturan bentuk yang terlalu kaku.' },

  // Social (4)
  { id: 13, code: 'S', statement: 'Saya senang membantu menjelaskan pelajaran kepada teman yang belum memahami materi.' },
  { id: 14, code: 'S', statement: 'Teman-teman sering merasa nyaman bercerita dan meminta pendapat saya saat menghadapi masalah.' },
  { id: 15, code: 'S', statement: 'Saya tertarik mengikuti kegiatan bakti sosial, Palang Merah Remaja (PMR), atau kepanitiaan pelayanan masyarakat.' },
  { id: 16, code: 'S', statement: 'Saya lebih memilih pekerjaan yang melibatkan interaksi langsung dan memberi manfaat bagi banyak orang.' },

  // Enterprising (4)
  { id: 17, code: 'E', statement: 'Saya berani mengajukan diri menjadi ketua kelompok atau memimpin jalannya diskusi kelas.' },
  { id: 18, code: 'E', statement: 'Saya senang meyakinkan orang lain terhadap ide saya saat presentasi atau kegiatan bazar sekolah.' },
  { id: 19, code: 'E', statement: 'Saya tertarik belajar cara berjualan produk kreatif dan mengatur strategi agar usaha diminati pembeli.' },
  { id: 20, code: 'E', statement: 'Saya bersemangat merencanakan acara sekolah bersama tim dan mengajak teman ikut berpartisipasi.' },

  // Conventional (4)
  { id: 21, code: 'C', statement: 'Saya suka merapikan catatan pelajaran, file komputer, atau daftar jadwal kegiatan agar tertata jelas.' },
  { id: 22, code: 'C', statement: 'Saya teliti memeriksa kembali angka, ejaan, atau urutan langkah sebelum mengumpulkan tugas.' },
  { id: 23, code: 'C', statement: 'Saya merasa nyaman mengikuti prosedur kerja yang terstruktur dengan panduan yang jelas.' },
  { id: 24, code: 'C', statement: 'Saya senang membantu tugas administrasi seperti mencatat absensi, daftar kas kelas, atau inventaris barang.' }
];

export const RIASEC_PROFILES: Record<RiasecCode, RiasecProfileInfo> = {
  R: {
    code: 'R',
    name: 'Realistic',
    indonesianTitle: 'Praktis & Terampil (Realistic)',
    tagline: 'Belajar paling cepat lewat praktik langsung, alat nyata, dan karya fisik.',
    description:
      'Kamu cenderung menyukai aktivitas nyata yang melibatkan keterampilan tangan, penggunaan alat, teknologi mekanik, atau kegiatan di lapangan. Kamu senang melihat hasil kerja yang langsung berwujud.',
    schoolActivities: [
      'Ekstrakurikuler Robotik, Pramuka, Pencinta Alam, atau Olahraga',
      'Prakarya rekayasa alat sederhana dan perakitan elektronika dasar',
      'Pengelolaan kebun sekolah / hidroponik'
    ],
    educationPaths: [
      'SMK Bidang Teknologi Rekayasa, Otomotif, Teknik Jaringan, atau Agribisnis',
      'SMA/MA dengan penguatan Fisika, Biologi Terapan, dan Informatika',
      'Pendidikan Vokasi / Politeknik Teknik'
    ],
    exampleProfessions: [
      'Teknisi Jaringan & Perangkat Keras',
      'Insinyur Mekanik / Energi Terbarukan',
      'Ahli Agronomi & Pertanian Modern',
      'Fotografer Lapangan / Teknisi Medis'
    ],
    selfDevRecommendations: [
      'Ikuti proyek pembuatan alat sederhana di lab atau bengkel sekolah.',
      'Latih juga komunikasi dan keselamatan kerja saat bekerja dalam tim.'
    ],
    accentHex: '#0284C7'
  },
  I: {
    code: 'I',
    name: 'Investigative',
    indonesianTitle: 'Analitis & Peneliti (Investigative)',
    tagline: 'Penasaran mendalam, senang menganalisis pola, dan memecahkan masalah.',
    description:
      'Kamu terdorong oleh rasa ingin tahu yang besar untuk memahami bagaimana sesuatu bekerja. Kamu suka mengamati, menganalisis data, berpikir logis, dan menemukan jawaban berbasis bukti.',
    schoolActivities: [
      'Kelompok Ilmiah Remaja (KIR) dan Olimpiade Sains/Matematika (OSN)',
      'Klub Informatika, Coding, atau Catur',
      'Eksperimen laboratorium IPA dan riset lingkungan sederhana'
    ],
    educationPaths: [
      'SMA/MA dengan pilihan Matematika Lanjut, IPA (Fisika/Kimia/Biologi), atau Informatika',
      'SMK Rekayasa Perangkat Lunak (RPL) atau Analisis Kimia',
      'Perguruan Tinggi rumpun Sains, Kesehatan, Teknik, dan Data'
    ],
    exampleProfessions: [
      'Analis Data & Pengembang Perangkat Lunak',
      'Dokter / Peneliti Kesehatan / Apoteker',
      'Ilmuwan Lingkungan / Bioteknologi',
      'Ahli Keamanan Siber'
    ],
    selfDevRecommendations: [
      'Biasakan menulis catatan pertanyaan dan temuan eksperimen di jurnal sainsmu.',
      'Latih penyampaian hasil riset dengan bahasa sederhana agar mudah dipahami orang lain.'
    ],
    accentHex: '#2563EB'
  },
  A: {
    code: 'A',
    name: 'Artistic',
    indonesianTitle: 'Kreatif & Ekspresif (Artistic)',
    tagline: 'Kaya imajinasi, peka estetika, dan gemar menciptakan karya orisinal.',
    description:
      'Kamu menikmati kebebasan berkreasi melalui visual, tulisan, musik, gerak, atau media digital. Kamu cenderung melihat sudut pandang unik dan suka memperindah cara penyampaian sebuah ide.',
    schoolActivities: [
      'Desain Mading, Majalah Sekolah, Klub Fotografi & Sinematografi',
      'Ekstrakurikuler Seni Rupa, Musik, Teater, atau Tari',
      'Lomba FLS2N atau proyek pembuatan media kampanye positif sekolah'
    ],
    educationPaths: [
      'SMK Bidang Seni & Ekonomi Kreatif (DKV, Animasi, Broadcasting, Tata Busana)',
      'SMA/MA dengan penguatan Bahasa, Sastra, dan Seni Budaya',
      'Fakultas Seni Rupa, Desain, Arsitektur, atau Ilmu Komunikasi'
    ],
    exampleProfessions: [
      'Desainer Grafis & UI/UX Digital',
      'Animator / Ilustrator / Editor Video',
      'Arsitek & Desainer Interior',
      'Penulis Kreatif / Kreator Konten Edukasi'
    ],
    selfDevRecommendations: [
      'Kumpulkan karya terbaikmu sejak SMP ke dalam folder portofolio digital atau buku sketsa.',
      'Latih manajemen waktu agar proyek kreatif tetap selesai tepat waktu.'
    ],
    accentHex: '#7C3AED'
  },
  S: {
    code: 'S',
    name: 'Social',
    indonesianTitle: 'Peduli & Kolaboratif (Social)',
    tagline: 'Hangat berinteraksi, empatik, dan senang membimbing atau menolong sesama.',
    description:
      'Kamu memiliki kepekaan sosial yang baik dan merasa berenergi ketika berinteraksi dengan orang lain. Kamu suka mendengarkan, mengajar teman, merawat, dan menciptakan suasana kelompok yang nyaman.',
    schoolActivities: [
      'Palang Merah Remaja (PMR), Konselor Sebaya, atau Tutor Belajar Teman',
      'Kegiatan bakti sosial dan keorganisasian siswa',
      'Klub debat, pidato, atau pemandu acara sekolah'
    ],
    educationPaths: [
      'SMA/MA dengan pilihan Sosiologi, Biologi, Bahasa, atau Psikologi Dasar',
      'SMK Bidang Layanan Kesehatan, Pekerjaan Sosial, atau Perhotelan',
      'Perguruan Tinggi rumpun Pendidikan, Psikologi, Kesehatan Masyarakat, dan Hukum'
    ],
    exampleProfessions: [
      'Guru / Konselor Sekolah / Dosen',
      'Psikolog / Pekerja Sosial',
      'Perawat / Bidan / Dokter Layanan Primer',
      'Spesialis Sumber Daya Manusia (HR) / Hubungan Masyarakat'
    ],
    selfDevRecommendations: [
      'Asah keterampilan mendengarkan aktif dan komunikasi yang tidak menghakimi.',
      'Belajar menjaga batas diri agar tetap sehat dan tidak kelelahan saat membantu orang lain.'
    ],
    accentHex: '#0D9488'
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    indonesianTitle: 'Inisiatif & Penggerak (Enterprising)',
    tagline: 'Berani memimpin, persuasif, dan antusias menggerakkan proyek atau usaha.',
    description:
      'Kamu nyaman tampil di depan, mengambil inisiatif, mengajak teman bekerja menuju tujuan bersama, dan tertarik melihat peluang usaha maupun kepemimpinan organisasi.',
    schoolActivities: [
      'Pengurus OSIS, Ketua Kelas, atau Koordinator Proyek P5/Bazar Sekolah',
      'Klub Kewirausahaan Muda atau Lomba Debat / Pidato',
      'Panitia penyelenggara pentas seni dan lomba antar kelas'
    ],
    educationPaths: [
      'SMK Bidang Bisnis & Manajemen atau Pemasaran Digital',
      'SMA/MA dengan pilihan Ekonomi, Sosiologi, dan Bahasa',
      'Perguruan Tinggi rumpun Manajemen Bisnis, Hukum, Hubungan Internasional, dan Komunikasi'
    ],
    exampleProfessions: [
      'Wirausahawan / Pendiri Usaha Kreatif',
      'Manajer Produk / Pemasaran Digital',
      'Pengacara / Diplomat / Presenter',
      'Koordinator Acara & Proyek Komunitas'
    ],
    selfDevRecommendations: [
      'Latih keterampilan mendengar pendapat anggota tim sebelum mengambil keputusan.',
      'Pelajari dasar literasi keuangan (mencatat modal, anggaran, dan risiko).'
    ],
    accentHex: '#D97706'
  },
  C: {
    code: 'C',
    name: 'Conventional',
    indonesianTitle: 'Terstruktur & Teliti (Conventional)',
    tagline: 'Rapi mengelola data, konsisten, dan menyukai sistem kerja yang jelas.',
    description:
      'Kamu unggul dalam ketelitian, keteraturan, pengolahan angka atau arsip, serta menjaga prosedur berjalan rapi. Tim sangat terbantu oleh kehadiranmu karena pekerjaan menjadi terorganisasi.',
    schoolActivities: [
      'Bendahara atau Sekretaris Kelas / OSIS',
      'Tim Perpustakaan Sekolah atau Pengelola Data Lomba',
      'Klub Akuntansi Dasar, Spreadsheet, atau Koperasi Siswa'
    ],
    educationPaths: [
      'SMK Akuntansi & Keuangan Lembaga atau Manajemen Perkantoran',
      'SMA/MA dengan pilihan Matematika dan Ekonomi',
      'Perguruan Tinggi rumpun Akuntansi, Statistika, Administrasi Publik, atau Sistem Informasi'
    ],
    exampleProfessions: [
      'Akuntan & Auditor Keuangan',
      'Analis Administrasi & Manajemen Perkantoran',
      'Statistikawan / Pengelola Basis Data',
      'Pustakawan Digital & Spesialis Kepatuhan'
    ],
    selfDevRecommendations: [
      'Pelajari rumus dasar pengolah angka (spreadsheet) sejak SMP.',
      'Latih keluwesan beradaptasi ketika menghadapi rencana yang berubah mendadak.'
    ],
    accentHex: '#4F46E5'
  }
};
