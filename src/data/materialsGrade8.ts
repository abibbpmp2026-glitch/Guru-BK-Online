import { CareerMaterial, MaterialQuiz } from '../types/bicara';

const IMG_VIII = '/src/assets/images/materi_kelas_8_1794573084599.jpg';

export const GRADE_8_MATERIALS: CareerMaterial[] = [
  {
    id: 'mat-viii-01',
    title: 'Mengenal Dunia Kerja',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Memahami gambaran nyata dunia kerja, etos kerja, dan perubahan pola kerja modern.',
    imageUrl: IMG_VIII,
    explanation:
      'Dunia kerja adalah lingkungan tempat orang berkarya, memecahkan masalah, dan menghasilkan produk atau jasa yang dibutuhkan masyarakat. Di dunia kerja, tidak cukup hanya pintar teori; seseorang perlu disiplin, mampu berkomunikasi sopan, dan mau terus belajar.\n\nSaat ini dunia kerja juga mengenal berbagai pola kerja: bekerja di kantor atau fasilitas lapangan, bekerja secara fleksibel jarak jauh, hingga menciptakan usaha sendiri.',
    dailyExamples: [
      'Menghargai tenggat waktu (deadline) tugas kelompok di kelas VIII melatih kebiasaan tepat waktu di dunia kerja.',
      'Klinik kesehatan membutuhkan kerja sama dokter, perawat, admin pendaftaran, dan petugas kebersihan agar pasien nyaman.',
      'Banyak tim desain dan teknologi kini berkolaborasi lewat dokumen daring secara terstruktur.'
    ],
    reflectionPrompt: 'Kebiasaan baik apa di sekolah yang menurutmu paling dibutuhkan saat seseorang masuk ke dunia kerja nanti?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-02',
    title: 'Mengenal Kelompok Profesi',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Mengelompokkan berbagai profesi berdasarkan rumpun bidang kerja dan karakteristik aktivitasnya.',
    imageUrl: IMG_VIII,
    explanation:
      'Supaya mudah dipelajari, ribuan profesi dapat dikelompokkan menjadi beberapa rumpun besar: (1) Sains, Teknologi, dan Rekayasa; (2) Kesehatan dan Pelayanan Sosial; (3) Pendidikan dan Humaniora; (4) Seni, Desain, dan Media; (5) Bisnis, Keuangan, dan Manajemen; serta (6) Pertanian, Kelautan, dan Lingkungan.\n\nDengan mengenal kelompok profesi, kamu bisa menemukan beberapa profesi sekaligus yang sesuai dengan satu minat utamamu.',
    dailyExamples: [
      'Jika kamu suka biologi dan menolong orang, kamu bisa melihat rumpun Kesehatan (dokter, perawat, ahli gizi, bidan, analis lab).',
      'Jika kamu suka menggambar dan bercerita, kamu bisa menelusuri rumpun Seni & Media (ilustrator, desainer produk, animator, editor video).',
      'Jika kamu menyukai hitungan dan kerapian data, ada rumpun Bisnis & Keuangan (akuntan, analis data, staf perbankan).'
    ],
    reflectionPrompt: 'Dari enam kelompok profesi tersebut, dua kelompok mana yang paling membuatmu tertarik untuk dicari tahu lebih jauh?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-03',
    title: 'Hubungan Mata Pelajaran dengan Profesi',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Menghubungkan materi pelajaran SMP dengan penerapan nyata di berbagai profesi.',
    imageUrl: IMG_VIII,
    explanation:
      'Pernah bertanya untuk apa kita belajar Matematika, Bahasa Indonesia, IPA, IPS, Seni Budaya, atau Informatika? Setiap mata pelajaran melatih pola pikir tertentu yang dipakai langsung dalam pekerjaan.\n\nMatematika melatih logika dan ketelitian analisis; Bahasa Indonesia dan Bahasa Inggris melatih komunikasi persuasif; IPA melatih metode ilmiah; IPS melatih pemahaman masyarakat dan ekonomi; sedangkan Seni dan Prakarya melatih daya cipta serta keterampilan tangan.',
    dailyExamples: [
      'Pelajaran Matematika (perbandingan dan geometri) digunakan oleh arsitek, akuntan, dan pembuat gim.',
      'Pelajaran Bahasa Indonesia digunakan jurnalis, penulis naskah, penyiar, dan humas perusahaan.',
      'Pelajaran IPA digunakan oleh apoteker, dokter hewan, teknisi energi surya, dan peneliti pangan.'
    ],
    reflectionPrompt: 'Pilih satu mata pelajaran yang kamu sukai di kelas VIII, lalu tuliskan tiga profesi yang memanfaatkan pelajaran tersebut!',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-04',
    title: 'Mengenal Pendidikan dan Keterampilan yang Dibutuhkan',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Membedakan jalur pendidikan serta peran hard skills dan soft skills dalam meraih karier.',
    imageUrl: IMG_VIII,
    explanation:
      'Setiap profesi memiliki syarat pendidikan dan keterampilan yang berbeda. Ada profesi yang siap ditempuh lewat SMK dan pelatihan vokasi/sertifikasi, ada pula yang memerlukan pendidikan tinggi sarjana atau profesi khusus (seperti dokter, guru, dan pengacara).\n\nSelain ijazah, dunia kerja menilai dua jenis keterampilan: Hard Skills (kemampuan teknis terukur seperti mengetik cepat, mengedit video, akuntansi, atau coding) dan Soft Skills (komunikasi, kerja sama, manajemen waktu, dan sikap pantang menyerah).',
    dailyExamples: [
      'Hard skill: Mengoperasikan perangkat lunak desain atau merakit rangkaian listrik dasar.',
      'Soft skill: Mampu bernegosiasi sopan saat membagi tugas piket atau presentasi kelompok.',
      'Seorang teknisi andal tidak hanya menguasai perbaikan alat (hard skill), tetapi juga ramah menjelaskan solusi kepada pelanggan (soft skill).'
    ],
    reflectionPrompt: 'Hard skill atau soft skill apa yang ingin kamu latih selama duduk di kelas VIII?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-05',
    title: 'Eksplorasi SMA dan SMK',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Mengenal gambaran awal perbedaan fokus belajar antara SMA dan SMK sejak kelas VIII.',
    imageUrl: IMG_VIII,
    explanation:
      'Setelah SMP, dua pilihan sekolah yang paling sering ditemui adalah Sekolah Menengah Atas (SMA) dan Sekolah Menengah Kejuruan (SMK). Keduanya sama-sama baik jika sesuai dengan tujuan dan gaya belajarmu!\n\nSMA berfokus pada penguatan ilmu pengetahuan umum dan akademik yang mempersiapkan siswa melanjutkan ke perguruan tinggi. Sementara itu, SMK berfokus pada keterampilan praktik kerja spesifik (sekitar 60-70% praktik kejuruan dan praktik kerja lapangan), sehingga lulusannya siap bekerja, berwirausaha, maupun tetap bisa kuliah.',
    dailyExamples: [
      'Rina bercita-cita menjadi dokter atau peneliti biologi, sehingga mulai tertarik mendalami opsi SMA.',
      'Fajar suka praktik langsung memperbaiki mesin motor dan ingin punya keterampilan siap kerja setelah lulus, sehingga melirik SMK.',
      'Siswa kelas VIII mulai mencari informasi jurusan apa saja yang tersedia di SMA dan SMK sekitar daerahnya.'
    ],
    reflectionPrompt: 'Apakah kamu lebih menikmati belajar teori konseptual mendalam atau praktik langsung membuat sesuatu? Jelaskan alasannya.',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-06',
    title: 'Mengenal Berbagai Bidang Keahlian SMK',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Mengenal ragam bidang keahlian SMK di Indonesia sesuai Spektrum Keahlian vokasi.',
    imageUrl: IMG_VIII,
    explanation:
      'SMK tidak hanya berisi jurusan otomotif atau tata boga saja! Pendidikan kejuruan di Indonesia memiliki berbagai bidang keahlian yang sangat luas.\n\nBidang keahlian SMK mencakup: Teknologi Manufaktur & Rekayasa, Energi & Pertambangan, Teknologi Informasi (Rekayasa Perangkat Lunak, Teknik Komputer & Jaringan), Kesehatan & Pekerjaan Sosial, Agribisnis & Agriteknologi, Kemaritiman, Bisnis & Manajemen, Pariwisata (Perhotelan, Kuliner), serta Seni & Ekonomi Kreatif (Animasi, Desain Komunikasi Visual, Broadcasting).',
    dailyExamples: [
      'Bidang Teknologi Informasi: Siswa SMK belajar membangun website, aplikasi mobile, dan keamanan jaringan.',
      'Bidang Seni & Ekonomi Kreatif: Siswa berlatih membuat desain kemasan produk, animasi, dan produksi film pendek.',
      'Bidang Agribisnis: Siswa mempraktikkan pertanian hidroponik modern dan pengolahan hasil pangan.'
    ],
    reflectionPrompt: 'Bidang keahlian SMK mana yang baru kamu tahu dan menarik perhatianmu?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-07',
    title: 'Mengenali Peluang Karier di Era Digital',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Memahami peluang karier berbasis teknologi digital sekaligus pentingnya literasi digital yang aman.',
    imageUrl: IMG_VIII,
    explanation:
      'Perkembangan teknologi internet, kecerdasan buatan (AI), dan ekonomi digital melahirkan banyak profesi baru yang sebelumnya belum populer, seperti desainer pengalaman pengguna (UI/UX), analis data, kreator konten edukasi, spesialis keamanan siber, hingga pengelola toko daring.\n\nNamun, memanfaatkan era digital sebagai pelajar SMP harus dibarengi etika dan keamanan: tidak menyebarkan data pribadi, menghindari hoaks, menghargai hak cipta, dan menggunakan gawai untuk berkarya, bukan sekadar konsumsi pasif.',
    dailyExamples: [
      'Membuat presentasi visual yang rapi dan infografis edukasi untuk tugas IPA menggunakan aplikasi desain.',
      'Belajar dasar pemrograman logika lewat proyek gim edukasi sederhana di mata pelajaran Informatika.',
      'Memahami cara melindungi privasi akun serta mengenali tautan penipuan di internet.'
    ],
    reflectionPrompt: 'Bagaimana caramu memanfaatkan teknologi atau gawai hari ini agar lebih produktif untuk masa depanmu?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-viii-08',
    title: 'Mengenal Kewirausahaan',
    grade: 'VIII',
    categoryId: 'cat-viii-eksplorasi',
    categoryName: 'Eksplorasi Karier',
    learningObjective: 'Memahami jiwa kewirausahaan (kreativitas, keberanian mencoba, dan pemecahan masalah) bagi remaja.',
    imageUrl: IMG_VIII,
    explanation:
      'Kewirausahaan bukan hanya soal berjualan makanan atau punya toko besar. Jiwa wirausaha adalah pola pikir melihat masalah di sekitar sebagai peluang untuk menciptakan solusi yang bernilai bagi orang lain.\n\nKarakter wirausaha meliputi kreativitas, kejujuran kepada pembeli, cermat menghitung modal dan keuntungan, berani mencoba hal baru, serta tidak mudah menyerah saat produk belum langsung laku.',
    dailyExamples: [
      'Saat bazar sekolah, tim kelas VIII menjual pembatas buku daur ulang bergambar kutipan penyemangat belajar.',
      'Siswa mencatat modal bahan baku, harga jual, dan keuntungan dengan jujur pada proyek P5 / Prakarya.',
      'Menawarkan jasa desain poster sederhana atau kerajinan tangan pada momen peringatan hari besar sekolah.'
    ],
    reflectionPrompt: 'Jika kelasmu mengadakan bazar kreativitas siswa, ide produk atau jasa bermanfaat apa yang ingin kamu tawarkan?',
    published: true,
    authorId: 'system-bk'
  }
];

export const GRADE_8_QUIZZES: MaterialQuiz[] = [
  {
    id: 'quiz-mat-viii-01',
    materialId: 'mat-viii-01',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa hal utama yang perlu disiapkan selain kepintaran akademis di dunia kerja?',
        options: [
          'Etos kerja, disiplin waktu, komunikasi sopan, dan kemauan terus belajar',
          'Hanya keberuntungan tanpa usaha',
          'Menghindari kerja sama dengan rekan kerja',
          'Menolak aturan tempat kerja'
        ],
        correctIndex: 0,
        explanation: 'Dunia kerja sangat menghargai kedisiplinan, integritas, komunikasi yang baik, dan sikap adaptif.'
      },
      {
        id: 'q2',
        question: 'Kebiasaan di kelas VIII yang melatih etos kerja di masa depan adalah...',
        options: [
          'Mengumpulkan tugas sesuai tenggat waktu yang disepakati',
          'Menunggu teman mengerjakan semua tugas kelompok',
          'Menunda pekerjaan hingga jam terakhir',
          'Sering membolos kelas'
        ],
        correctIndex: 0,
        explanation: 'Ketepatan waktu dan tanggung jawab di sekolah menjadi bekal utama etos kerja profesional.'
      },
      {
        id: 'q3',
        question: 'Apa arti kolaborasi di dunia kerja?',
        options: [
          'Berbagai profesi bekerja saling melengkapi untuk menghasilkan layanan atau produk yang utuh',
          'Semua orang melakukan tugas yang sama persis sendirian',
          'Saling menjatuhkan antar divisi',
          'Bekerja tanpa berkomunikasi'
        ],
        correctIndex: 0,
        explanation: 'Kolaborasi menyatukan keahlian berbeda agar tujuan organisasi tercapai lebih efektif.'
      },
      {
        id: 'q4',
        question: 'Pola kerja di era modern saat ini meliputi...',
        options: [
          'Kerja di kantor/lapangan, kerja jarak jauh berbasis digital, hingga berwirausaha',
          'Hanya bekerja di dalam pabrik saja',
          'Tidak ada pekerjaan yang memakai komputer',
          'Semua orang wajib bekerja sendiri di rumah'
        ],
        correctIndex: 0,
        explanation: 'Perkembangan teknologi menghadirkan beragam pola kerja yang fleksibel sesuai jenis bidangnya.'
      },
      {
        id: 'q5',
        question: 'Mengapa kemauan terus belajar penting di dunia kerja?',
        options: [
          'Karena teknologi dan kebutuhan masyarakat terus berkembang dari waktu ke waktu',
          'Karena semua pelajaran sekolah akan langsung terlupakan',
          'Agar tidak perlu beristirahat',
          'Supaya tidak pernah bekerja sama'
        ],
        correctIndex: 0,
        explanation: 'Belajar sepanjang hayat membuat seseorang tetap relevan dan siap menghadapi perubahan.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-02',
    materialId: 'mat-viii-02',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Mengelompokkan profesi ke dalam beberapa rumpun membantu siswa untuk...',
        options: [
          'Menemukan banyak alternatif profesi yang sesuai dengan satu minat utama',
          'Membatasi cita-cita menjadi satu saja',
          'Menghafal tanpa memahami jenis pekerjaannya',
          'Mengabaikan bakat yang dimiliki'
        ],
        correctIndex: 0,
        explanation: 'Mengetahui rumpun profesi memperluas pilihan sehingga siswa tidak terpaku pada satu nama pekerjaan.'
      },
      {
        id: 'q2',
        question: 'Analis data, perawat, dan jurnalis masing-masing termasuk ke dalam rumpun...',
        options: [
          'Teknologi/Data, Kesehatan, serta Seni & Media',
          'Semuanya termasuk rumpun pertanian',
          'Ketiganya hanya ada di dunia hiburan',
          'Tidak termasuk profesi formal'
        ],
        correctIndex: 0,
        explanation: 'Setiap profesi memiliki rumpun bidang kerja dan keahlian utama masing-masing.'
      },
      {
        id: 'q3',
        question: 'Siswa yang gemar merawat tanaman dan menjaga kelestarian alam cocok menelusuri rumpun...',
        options: [
          'Pertanian, Kelautan, dan Lingkungan',
          'Keuangan dan Perbankan saja',
          'Animasi 3D saja',
          'Otomotif balap'
        ],
        correctIndex: 0,
        explanation: 'Rumpun pertanian dan lingkungan mencakup agronomi, kehutanan, kelautan, hingga konservasi alam.'
      },
      {
        id: 'q4',
        question: 'Profesi akuntan dan manajer produk umumnya berada dalam rumpun...',
        options: [
          'Bisnis, Keuangan, dan Manajemen',
          'Kesehatan Masyarakat',
          'Teknik Mesin Berat',
          'Seni Tari'
        ],
        correctIndex: 0,
        explanation: 'Akuntan dan manajer berperan mengelola keuangan, strategi, dan operasional usaha.'
      },
      {
        id: 'q5',
        question: 'Apakah satu bidang industri hanya diisi oleh satu rumpun profesi?',
        options: [
          'Tidak, sebuah industri biasanya mempekerjakan banyak rumpun profesi sekaligus',
          'Ya, rumah sakit hanya memiliki dokter',
          'Ya, sekolah hanya memiliki guru matematika',
          'Ya, perusahaan teknologi hanya memiliki pemrogram'
        ],
        correctIndex: 0,
        explanation: 'Di industri mana pun, tim teknologi, keuangan, komunikasi, dan operasional selalu bekerja berdampingan.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-03',
    materialId: 'mat-viii-03',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Pelajaran Bahasa Indonesia dan Bahasa Inggris sangat melatih keterampilan...',
        options: [
          'Komunikasi lisan dan tulisan yang efektif di berbagai profesi',
          'Menghafal rumus kimia saja',
          'Merakit mesin kendaraan',
          'Mengukur tekanan darah'
        ],
        correctIndex: 0,
        explanation: 'Kemampuan membaca kritis dan menyampaikan gagasan secara jelas dibutuhkan di hampir semua profesi.'
      },
      {
        id: 'q2',
        question: 'Profesi arsitek dan pembuat gim banyak memanfaatkan konsep pelajaran Matematika, khususnya...',
        options: [
          'Geometri, skala, perbandingan, dan logika spasial',
          'Hafalan nama ibu kota negara',
          'Teknik pernapasan renang',
          'Tata cara upacara bendera'
        ],
        correctIndex: 0,
        explanation: 'Geometri dan perhitungan proporsi menjadi dasar dalam perancangan ruang bangunan maupun dunia 3D.'
      },
      {
        id: 'q3',
        question: 'Jika seseorang ingin mendalami bidang farmasi atau teknologi pangan, pelajaran SMP apa yang berperan penting?',
        options: [
          'Ilmu Pengetahuan Alam (IPA)',
          'Pendidikan Jasmani saja',
          'Seni Musik saja',
          'Tidak ada mata pelajaran yang relevan'
        ],
        correctIndex: 0,
        explanation: 'Dasar biologi, kimia sederhana, dan metode ilmiah di IPA sangat berkaitan dengan farmasi dan pangan.'
      },
      {
        id: 'q4',
        question: 'Mata pelajaran IPS membantu siswa memahami karier di bidang...',
        options: [
          'Ekonomi, kewirausahaan, sosiologi, pariwisata, dan kebijakan publik',
          'Perakitan komputer saja',
          'Pengelasan logam',
          'Anatomi tubuh manusia'
        ],
        correctIndex: 0,
        explanation: 'IPS mengenalkan dinamika masyarakat, sejarah, geografi, serta kegiatan ekonomi.'
      },
      {
        id: 'q5',
        question: 'Bagaimana sikap bijak terhadap mata pelajaran yang terasa kurang kita sukai?',
        options: [
          'Tetap mempelajari dasarnya dengan sungguh-sungguh karena semua ilmu saling melengkapi',
          'Menyerah total dan tidak masuk kelas',
          'Menganggap pelajaran itu tidak berguna bagi siapa pun',
          'Menyalahkan guru pengajar'
        ],
        correctIndex: 0,
        explanation: 'Pemahaman dasar lintas pelajaran memberi fleksibilitas karier yang lebih luas di masa depan.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-04',
    materialId: 'mat-viii-04',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Manakah yang termasuk contoh Hard Skill?',
        options: [
          'Kemampuan membuat desain grafis atau menulis kode program sederhana',
          'Sikap ramah saat menyapa teman',
          'Kemampuan menahan emosi saat diskusi',
          'Kebiasaan jujur dan tepat waktu'
        ],
        correctIndex: 0,
        explanation: 'Hard skill adalah keahlian teknis spesifik yang dapat diuji dan dipraktikkan secara langsung.'
      },
      {
        id: 'q2',
        question: 'Manakah yang termasuk contoh Soft Skill?',
        options: [
          'Komunikasi asertif, kerja sama tim, dan manajemen waktu',
          'Mengoperasikan mesin bubut',
          'Menghitung neraca akuntansi dengan spreadsheet',
          'Mengedit video dengan perangkat lunak'
        ],
        correctIndex: 0,
        explanation: 'Soft skill berkaitan dengan kecerdasan sosial, sikap kerja, dan pengelolaan diri.'
      },
      {
        id: 'q3',
        question: 'Mengapa perusahaan atau organisasi menghargai perpaduan hard skill dan soft skill?',
        options: [
          'Keahlian teknis membuat pekerjaan selesai, sedangkan soft skill membuat tim bekerja harmonis dan dipercaya',
          'Soft skill hanya dibutuhkan saat istirahat makan siang',
          'Hard skill tidak penting asal ramah',
          'Keduanya tidak berhubungan dengan pekerjaan'
        ],
        correctIndex: 0,
        explanation: 'Keduanya saling melengkapi agar seseorang tidak hanya cakap teknis, tetapi juga mampu berkolaborasi.'
      },
      {
        id: 'q4',
        question: 'Profesi seperti dokter atau guru wajib menempuh...',
        options: [
          'Pendidikan tinggi sarjana dan pendidikan profesi/sertifikasi resmi sesuai aturan',
          'Kursus singkat dua hari tanpa ijazah',
          'Cukup lulus SD saja',
          'Tidak memerlukan pendidikan formal'
        ],
        correctIndex: 0,
        explanation: 'Profesi yang menyangkut keselamatan atau pendidikan publik memiliki standar kualifikasi resmi.'
      },
      {
        id: 'q5',
        question: 'Aktivitas di SMP yang efektif melatih soft skill kepemimpinan adalah...',
        options: [
          'Aktif berorganisasi di OSIS, Pramuka, PMR, atau menjadi ketua proyek kelas',
          'Menyendiri sepanjang jam istirahat',
          'Menolak tanggung jawab kelompok',
          'Menyalin tugas teman'
        ],
        correctIndex: 0,
        explanation: 'Organisasi dan proyek sekolah melatih komunikasi, empati, serta pengambilan keputusan bersama.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-05',
    materialId: 'mat-viii-05',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Fokus utama pembelajaran di SMA adalah...',
        options: [
          'Penguasaan ilmu pengetahuan umum dan akademik sebagai persiapan melanjutkan ke perguruan tinggi',
          'Hanya praktik bengkel otomotif setiap hari',
          'Tidak mempelajari matematika dan bahasa',
          'Menghilangkan semua kegiatan ilmiah'
        ],
        correctIndex: 0,
        explanation: 'SMA dirancang untuk memperdalam konsep keilmuan guna melanjutkan studi ke jenjang universitas.'
      },
      {
        id: 'q2',
        question: 'Keunggulan utama pendidikan di SMK adalah...',
        options: [
          'Porsi praktik kejuruan yang besar serta pengalaman Praktik Kerja Lapangan (PKL)',
          'Siswa tidak pernah masuk ruang praktik',
          'Lulusan SMK dilarang melanjutkan kuliah',
          'Tidak memiliki mata pelajaran umum sama sekali'
        ],
        correctIndex: 0,
        explanation: 'SMK membekali siswa keterampilan terapan siap kerja sekaligus tetap membuka jalur kuliah (BMW: Bekerja, Melanjutkan, Wirausaha).'
      },
      {
        id: 'q3',
        question: 'Apakah lulusan SMK boleh melanjutkan kuliah ke perguruan tinggi?',
        options: [
          'Boleh dan sangat terbuka, baik ke politeknik maupun universitas',
          'Tidak diperbolehkan sama sekali',
          'Hanya boleh kuliah di luar negeri',
          'Harus mengulang SMA dari kelas X'
        ],
        correctIndex: 0,
        explanation: 'Lulusan SMK memiliki kesempatan yang sama untuk mengikuti seleksi masuk perguruan tinggi.'
      },
      {
        id: 'q4',
        question: 'Mengapa penting mengeksplorasi info SMA dan SMK sejak kelas VIII?',
        options: [
          'Agar punya waktu membandingkan minat, jurusan, dan kesiapan diri sebelum kelas IX',
          'Karena pendaftaran sekolah selalu ditutup saat kelas VIII',
          'Supaya bisa pindah sekolah di tengah semester',
          'Agar tidak perlu ujian akhir kelas IX'
        ],
        correctIndex: 0,
        explanation: 'Eksplorasi lebih awal mencegah keputusan tergesa-gesa saat pendaftaran murid baru tiba.'
      },
      {
        id: 'q5',
        question: 'Pernyataan yang paling tepat mengenai SMA dan SMK adalah...',
        options: [
          'Keduanya sama-sama baik; pilihan terbaik adalah yang sesuai minat, potensi, dan rencana masa depan siswa',
          'SMA selalu lebih unggul untuk semua orang',
          'SMK hanya untuk siswa yang tidak suka belajar',
          'Memilih sekolah cukup berdasarkan sekolah terdekat tanpa melihat minat'
        ],
        correctIndex: 0,
        explanation: 'Tidak ada jenjang yang lebih rendah; kecocokan dengan tujuan belajar siswa adalah kunci utama.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-06',
    materialId: 'mat-viii-06',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Jurusan Rekayasa Perangkat Lunak (RPL) dan Teknik Komputer & Jaringan (TKJ) di SMK masuk dalam bidang keahlian...',
        options: [
          'Teknologi Informasi',
          'Tata Busana',
          'Agribisnis Ternak',
          'Keperawatan'
        ],
        correctIndex: 0,
        explanation: 'RPL, TKJ, dan Pengembangan Gim berada di bawah rumpun Teknologi Informasi.'
      },
      {
        id: 'q2',
        question: 'Jika siswa menyukai animasi, fotografi, dan desain poster, bidang keahlian SMK yang cocok adalah...',
        options: [
          'Seni dan Ekonomi Kreatif (seperti DKV atau Animasi)',
          'Teknik Pengelasan Kapal',
          'Akuntansi Pajak',
          'Teknik Pertambangan'
        ],
        correctIndex: 0,
        explanation: 'Desain Komunikasi Visual (DKV), Animasi, dan Broadcasting mengembangkan karya kreatif visual dan media.'
      },
      {
        id: 'q3',
        question: 'SMK bidang Pariwisata biasanya menyediakan program keahlian seperti...',
        options: [
          'Perhotelan, Kuliner (Tata Boga), dan Usaha Layanan Wisata',
          'Teknik Alat Berat Tambang',
          'Rekayasa Genetika',
          'Teknik Telekomunikasi Satelit'
        ],
        correctIndex: 0,
        explanation: 'Sektor pariwisata meliputi layanan perhotelan, kuliner profesional, serta perencanaan wisata.'
      },
      {
        id: 'q4',
        question: 'Apa fokus bidang keahlian Agribisnis dan Agriteknologi di SMK?',
        options: [
          'Pertanian modern, pengolahan hasil pangan, peternakan, dan teknologi lahan berkelanjutan',
          'Perakitan pesawat terbang',
          'Desain perhiasan logam mulia',
          'Penyiaran berita radio'
        ],
        correctIndex: 0,
        explanation: 'Agribisnis modern memadukan pengetahuan hayati, teknologi budidaya, dan pengelolaan usaha pangan.'
      },
      {
        id: 'q5',
        question: 'Mengapa setiap siswa perlu memeriksa daftar program keahlian di SMK sekitar daerahnya?',
        options: [
          'Karena tidak semua SMK membuka seluruh bidang keahlian yang sama',
          'Karena semua SMK di Indonesia hanya memiliki satu jurusan',
          'Agar tidak perlu datang ke sekolah',
          'Supaya bisa memilih jurusan tanpa syarat'
        ],
        correctIndex: 0,
        explanation: 'Tiap SMK memiliki kompetensi keahlian unggulan masing-masing sesuai kebutuhan daerah dan fasilitasnya.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-07',
    materialId: 'mat-viii-07',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Manakah contoh profesi yang berkembang pesat di era digital saat ini?',
        options: [
          'Desainer UI/UX, analis data, dan spesialis keamanan siber',
          'Penjaga mercusuar manual saja',
          'Tukang ketik mesin tik mekanik',
          'Pengantar telegram kertas'
        ],
        correctIndex: 0,
        explanation: 'Transformasi digital meningkatkan kebutuhan tenaga ahli desain produk digital, pengolahan data, dan keamanan siber.'
      },
      {
        id: 'q2',
        question: 'Etika penting yang wajib dijaga pelajar SMP saat berkarya di ruang digital adalah...',
        options: [
          'Menjaga privasi data pribadi, menghargai hak cipta, dan memeriksa kebenaran informasi',
          'Membagikan alamat rumah dan kata sandi ke publik',
          'Mengambil karya teman tanpa izin dan mengklaim sebagai milik sendiri',
          'Menyebarkan berita yang belum jelas sumbernya'
        ],
        correctIndex: 0,
        explanation: 'Literasi dan etika digital melindungi keselamatan diri sekaligus menghormati karya orang lain.'
      },
      {
        id: 'q3',
        question: 'Menggunakan gawai secara produktif bagi siswa kelas VIII dapat dilakukan dengan cara...',
        options: [
          'Membuat infografis tugas, belajar bahasa asing, atau berlatih logika pemrograman',
          'Menonton video acak hingga tengah malam setiap hari',
          'Mengabaikan tugas sekolah demi gim daring',
          'Memberikan komentar kasar di media sosial'
        ],
        correctIndex: 0,
        explanation: 'Teknologi menjadi alat akselerasi belajar apabila dipakai untuk mencipta dan menambah wawasan.'
      },
      {
        id: 'q4',
        question: 'Apa peran kecerdasan buatan (AI) yang bijak bagi pelajar?',
        options: [
          'Sebagai alat bantu belajar dan diskusi memahami konsep, bukan menggantikan proses berpikir sendiri',
          'Untuk menyontek seluruh jawaban ujian tanpa membaca',
          'Menggantikan peran guru dan orang tua sepenuhnya',
          'Membuat siswa berhenti membaca buku'
        ],
        correctIndex: 0,
        explanation: 'AI membantu menjelaskan konsep atau memberi ide awal, namun pemahaman dan karya tetap milik siswa.'
      },
      {
        id: 'q5',
        question: 'Keterampilan non-teknis yang tetap sangat dibutuhkan di era AI adalah...',
        options: [
          'Berpikir kritis, empati, kreativitas, dan etika mengambil keputusan',
          'Menghafal tanpa mengerti konteks',
          'Menolak berkomunikasi dengan manusia',
          'Meniru semua jawaban mesin mentah-mentah'
        ],
        correctIndex: 0,
        explanation: 'Empati manusia, pertimbangan etis, dan pemikiran kritis tidak dapat digantikan oleh mesin.'
      }
    ]
  },
  {
    id: 'quiz-mat-viii-08',
    materialId: 'mat-viii-08',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa inti dari pola pikir kewirausahaan?',
        options: [
          'Melihat masalah sekitar sebagai peluang menciptakan solusi kreatif yang bermanfaat',
          'Menunggu modal miliaran rupiah baru mau belajar berusaha',
          'Menjual barang rusak kepada pembeli',
          'Menghindari risiko sekecil apa pun tanpa mencoba'
        ],
        correctIndex: 0,
        explanation: 'Kewirausahaan berawal dari kepekaan terhadap kebutuhan orang lain dan keberanian mencoba solusi baru.'
      },
      {
        id: 'q2',
        question: 'Nilai penting yang menjaga pelanggan tetap percaya pada sebuah usaha adalah...',
        options: [
          'Kejujuran kualitas produk, ketepatan janji, dan pelayanan yang ramah',
          'Menaikkan harga seenaknya tanpa kualitas',
          'Menyembunyikan cacat barang',
          'Mengabaikan keluhan pembeli'
        ],
        correctIndex: 0,
        explanation: 'Kepercayaan pelanggan adalah aset paling berharga dalam usaha apa pun.'
      },
      {
        id: 'q3',
        question: 'Dalam proyek bazar sekolah, mengapa siswa perlu mencatat modal dan hasil penjualan?',
        options: [
          'Untuk melatih ketelitian keuangan dan mengetahui apakah usaha berjalan sehat',
          'Hanya untuk memenuhi kertas catatan',
          'Agar bisa menyembunyikan keuntungan dari kelompok',
          'Supaya tidak perlu menghitung kembalian pembeli'
        ],
        correctIndex: 0,
        explanation: 'Literasi keuangan sederhana mencegah kerugian dan mengajarkan tanggung jawab pengelolaan dana.'
      },
      {
        id: 'q4',
        question: 'Bagaimana sikap wirausaha ketika produk pertama yang dibuat belum banyak diminati?',
        options: [
          'Menerima masukan, mengevaluasi kekurangan, dan memperbaiki kualitas produk',
          'Langsung marah pada teman yang tidak membeli',
          'Menyerah selamanya dari semua kegiatan',
          'Menyalahkan panitia bazar'
        ],
        correctIndex: 0,
        explanation: 'Kegagalan awal adalah bahan belajar yang sangat berharga untuk berinovasi lebih baik.'
      },
      {
        id: 'q5',
        question: 'Apakah jiwa wirausaha bermanfaat meskipun kelak seseorang memilih bekerja sebagai pegawai atau profesional?',
        options: [
          'Ya, karena pekerja berjiwa wirausaha lebih inisiatif, kreatif, dan solutif',
          'Tidak, hanya berguna bagi pemilik warung',
          'Justru merugikan pekerjaan kantor',
          'Hanya berlaku untuk mata pelajaran IPS'
        ],
        correctIndex: 0,
        explanation: 'Inisiatif dan kemampuan memecahkan masalah (intrapreneurship) sangat dicari di berbagai organisasi.'
      }
    ]
  }
];
