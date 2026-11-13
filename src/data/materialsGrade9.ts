import { CareerMaterial, MaterialQuiz } from '../types/bicara';

const IMG_IX = '/src/assets/images/materi_kelas_9_1794573084699.jpg';

export const GRADE_9_MATERIALS: CareerMaterial[] = [
  {
    id: 'mat-ix-01',
    title: 'Mengenal Pilihan Pendidikan Setelah SMP',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Mengenal jalur pendidikan menengah formal dan non-formal yang tersedia setelah lulus SMP.',
    imageUrl: IMG_IX,
    explanation:
      'Lulus dari SMP/MTs merupakan gerbang penting menuju pendidikan menengah. Di Indonesia, pilihan utama pendidikan menengah meliputi Sekolah Menengah Atas (SMA), Sekolah Menengah Kejuruan (SMK), Madrasah Aliyah (MA), Madrasah Aliyah Kejuruan (MAK), serta jalur pendidikan kesetaraan (Paket C) atau pesantren muadalah.\n\nSetiap jalur dirancang untuk kebutuhan dan tujuan belajar yang berbeda, namun semuanya memiliki kedudukan yang setara sebagai jenjang pendidikan menengah (12 tahun wajib belajar menuju kelulusan kelas XII).',
    dailyExamples: [
      'Siswa yang ingin memperdalam ilmu akademik umum dan sains mendaftar ke SMA.',
      'Siswa yang ingin menguasai keterampilan praktik kejuruan langsung memilih SMK.',
      'Siswa yang ingin memadukan pendidikan menengah umum dengan penguatan ilmu keislaman memilih MA.'
    ],
    reflectionPrompt: 'Dari berbagai pilihan pendidikan setelah SMP, jalur mana yang paling sering kamu pertimbangkan saat ini dan mengapa?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-02',
    title: 'Perbedaan SMA, SMK, dan MA',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Membandingkan kurikulum, porsi praktik, lingkungan belajar, dan prospek lulusan SMA, SMK, dan MA.',
    imageUrl: IMG_IX,
    explanation:
      'Memahami perbedaan SMA, SMK, dan MA menghindarkan kamu dari salah pilih sekolah:\n\n1. SMA: Berfokus pada penguasaan ilmu pengetahuan umum dan akademik yang luas. Sangat cocok bagi siswa yang menargetkan melanjutkan kuliah di perguruan tinggi pada beragam bidang keilmuan.\n2. SMK: Berfokus pada kompetensi kerja kejuruan tertentu dengan porsi praktik laboratorium/bengkel dan Praktik Kerja Lapangan (PKL). Lulusan disiapkan untuk bekerja, berwirausaha, maupun melanjutkan kuliah vokasi/akademik.\n3. MA: Berada di bawah binaan Kementerian Agama dengan kurikulum setara SMA namun diperkaya pelajaran agama Islam (Al-Qur\'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab). Ada pula MA Plus Keterampilan.',
    dailyExamples: [
      'Dina memilih SMA karena ingin mengambil jurusan Kedokteran atau Psikologi di universitas.',
      'Arman memilih SMK Teknik Komputer & Jaringan karena suka merakit jaringan dan ingin cepat mengantongi sertifikat keahlian.',
      'Salma memilih MA karena bercita-cita kuliah sambil mendalami kajian bahasa Arab dan ilmu agama.'
    ],
    reflectionPrompt: 'Tuliskan dua kelebihan dari SMA, SMK, atau MA yang paling sesuai dengan gaya belajarmu!',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-03',
    title: 'Mengenal Jalur Pendidikan Lanjutan',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Memahami jalur seleksi masuk pendidikan menengah serta gambaran jenjang lanjutan setelah SMA/SMK/MA.',
    imageUrl: IMG_IX,
    explanation:
      'Untuk masuk ke sekolah menengah negeri maupun swasta, umumnya terdapat beberapa jalur seleksi resmi yang diatur oleh dinas pendidikan daerah atau kementerian terkait, seperti jalur domisili/zonasi, jalur prestasi (nilai rapor atau kejuaraan), jalur afirmasi bagi keluarga kurang mampu atau penyandang disabilitas, dan jalur mutasi orang tua.\n\nSetelah menamatkan SMA/SMK/MA kelak, jalanmu juga terbuka luas menuju Universitas/Institut (S1), Politeknik/Sekolah Vokasi (D3/D4), Sekolah Kedinasan, pelatihan kerja bersertifikat, atau dunia usaha.',
    dailyExamples: [
      'Mengumpulkan sertifikat lomba resmi (OSN, O2SN, FLS2N, atau kejuaraan olahraga) sejak SMP untuk persiapan jalur prestasi.',
      'Menjaga kestabilan nilai rapor dari semester 1 hingga semester 5 agar memenuhi syarat seleksi prestasi rapor.',
      'Memantau situs resmi dinas pendidikan setempat bersama orang tua dan Guru BK agar tidak tertinggal jadwal pendaftaran.'
    ],
    reflectionPrompt: 'Jalur masuk sekolah menengah mana yang paling berpeluang kamu ikuti berdasarkan domisili, prestasi, atau kondisimu saat ini?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-04',
    title: 'Memilih Sekolah Sesuai Minat dan Potensi',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Menggunakan kriteria objektif dalam memilih sekolah lanjutan tanpa sekadar ikut-ikutan teman.',
    imageUrl: IMG_IX,
    explanation:
      'Kesalahan paling sering terjadi di kelas IX adalah memilih sekolah hanya karena ikut sahabat dekat atau karena gengsi semata. Padahal, yang menjalani proses belajar selama tiga tahun nanti adalah dirimu sendiri.\n\nPertimbangkan lima hal utama: (1) Minat dan hasil eksplorasi bakatmu; (2) Kekuatan mata pelajaran dan gaya belajarmu; (3) Ketersediaan jurusan atau program unggulan di sekolah tujuan; (4) Jarak tempuh, biaya, dan dukungan keluarga; serta (5) Peluang kelanjutan setelah lulus.',
    dailyExamples: [
      'Meskipun sahabat karibnya mendaftar ke SMK Akuntansi, Sari tetap mantap mendaftar ke SMA karena minatnya di biologi dan riset.',
      'Berdiskusi tenang bersama orang tua dengan menunjukkan hasil tes minat RIASEC dan daftar 3 sekolah pilihan.',
      'Mengecek fasilitas bengkel praktik atau laboratorium sekolah saat hari terbuka (open house) sekolah.'
    ],
    reflectionPrompt: 'Apa tiga kriteria terpenting bagimu dan keluargamu saat menentukan sekolah tujuan setelah SMP?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-05',
    title: 'Mengenal Jurusan dan Konsentrasi Keahlian',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Memahami sistem pemilihan mata pelajaran pilihan di SMA/MA dan konsentrasi keahlian di SMK.',
    imageUrl: IMG_IX,
    explanation:
      'Dalam Kurikulum Merdeka di SMA/MA, siswa kelas X umumnya belajar mata pelajaran umum terlebih dahulu, lalu di kelas XI dan XII memilih paket mata pelajaran pilihan sesuai minat rencana kuliah/karier (misalnya kelompok MIPA/Kesehatan, IPS/Ekonomi/Hukum, atau Bahasa/Seni).\n\nSementara di SMK, siswa sejak awal memilih Program Keahlian lalu mengerucut pada Konsentrasi Keahlian spesifik (misalnya Program Pengembangan Perangkat Lunak dan Gim dengan konsentrasi Rekayasa Perangkat Lunak). Memahami hal ini membantumu menyambungkan sekolah menengah dengan jurusan impian nanti.',
    dailyExamples: [
      'Siswa yang ingin kuliah Teknik Sipil di SMA kelak memilih paket Matematika Tingkat Lanjut dan Fisika di kelas XI.',
      'Siswa SMK Program Desain Komunikasi Visual belajar fotografi produk, tipografi, hingga penyuntingan video.',
      'Siswa yang ingin masuk Ilmu Komunikasi mengasah mata pelajaran Bahasa, Sosiologi, dan Literasi Media.'
    ],
    reflectionPrompt: 'Jika kelak kamu memilih mata pelajaran pilihan di SMA atau konsentrasi keahlian di SMK, bidang apa yang paling kamu minati?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-06',
    title: 'Menyusun Rencana Pendidikan Lanjutan',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Membuat daftar rencana pilihan sekolah utama dan cadangan (Plan A dan Plan B) bersama orang tua.',
    imageUrl: IMG_IX,
    explanation:
      'Perencanaan yang matang selalu menyiapkan rencana cadangan yang sama baiknya. Di kelas IX, kamu disarankan menyusun minimal 2 sampai 3 opsi sekolah/jurusan: Pilihan Utama (Plan A) dan Pilihan Alternatif (Plan B).\n\nSelain itu, siapkan dokumen penting lebih awal seperti akta kelahiran, kartu keluarga, rapor semester 1–5 yang sudah diperiksa kebenaran datanya, serta sertifikat prestasi jika ada. Persiapan dini membuat proses pendaftaran terasa jauh lebih tenang.',
    dailyExamples: [
      'Plan A: SMAN 2 jalur prestasi akademik; Plan B: SMAN 5 jalur domisili atau SMK Negeri jurusan Informatika.',
      'Mengecek kesesuaian nama dan NISN pada rapor bersama wali kelas di semester ganjil kelas IX.',
      'Membuat daftar pertanyaan untuk ditanyakan saat sosialisasi PPDB/SPMB sekolah.'
    ],
    reflectionPrompt: 'Tuliskan secara singkat Plan A dan Plan B sekolah tujuanmu setelah lulus SMP nanti!',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-07',
    title: 'Strategi Menentukan Pilihan Karier',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Menerapkan langkah sistematis untuk mengevaluasi kecocokan antara diri, dukungan keluarga, dan peluang karier.',
    imageUrl: IMG_IX,
    explanation:
      'Bagaimana kalau kamu masih bingung antara dua pilihan karier yang sama-sama menarik? Gunakan strategi 4 langkah: (1) Kumpulkan data diri (hasil kuis minat RIASEC, nilai pelajaran, dan catatan hobi); (2) Riset informasi nyata tentang profesi dan jalur sekolahnya; (3) Diskusikan bersama orang tua dan Guru BK untuk mendapat sudut pandang dewasa; dan (4) Uji coba lewat kegiatan kecil atau wawancara singkat dengan kakak kelas/profesional di bidang tersebut.',
    dailyExamples: [
      'Bimbang antara jadi chef (kuliner) atau desainer grafis: siswa mencoba membantu usaha kue keluarga sekaligus membuat desain promosinya.',
      'Mengajak orang tua berbicara santai di akhir pekan mengenai harapan mereka dan minat pribadi siswa.',
      'Menghubungi alumni SMP yang sudah bersekolah di SMK/SMA incaran untuk bertanya pengalaman belajarnya.'
    ],
    reflectionPrompt: 'Siapa orang dewasa atau alumni yang bisa kamu ajak berdiskusi minggu ini untuk membantu memantapkan pilihanmu?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-ix-08',
    title: 'Membuat Peta Jalan Cita-Cita',
    grade: 'IX',
    categoryId: 'cat-ix-rencana-masa-depan',
    categoryName: 'Merencanakan Masa Depan',
    learningObjective: 'Merancang peta jalan (career roadmap) pribadi dari kelas IX hingga 5 tahun mendatang.',
    imageUrl: IMG_IX,
    explanation:
      'Peta jalan cita-cita (career roadmap) adalah garis waktu sederhana yang menghubungkan posisimu hari ini dengan target masa depanmu. Peta jalan tidak harus kaku; ia berfungsi sebagai kompas agar langkahmu terarah.\n\nBagi peta jalan menjadi 4 tahap: (1) Jangka sangat pendek (semester ini di kelas IX: menjaga nilai dan menyiapkan portofolio); (2) Jangka pendek (masuk SMA/SMK/MA pilihan); (3) Jangka menengah (mengasah keahlian/ekstrakurikuler di kelas X–XII); dan (4) Jangka panjang (kuliah, vokasi, atau karya profesional yang bermanfaat).',
    dailyExamples: [
      'Tahap 1 (Kelas IX): Nilai rata-rata stabil >= 82 dan aktif di klub sains/literasi.',
      'Tahap 2 (Tahun depan): Masuk SMA/SMK pilihan dan mengikuti ekstrakurikuler relevan.',
      'Tahap 3 & 4 (3–5 tahun lagi): Mengikuti olimpiade/PKL bermutu lalu melanjutkan pendidikan tinggi atau berkarya di bidang pilihan.'
    ],
    reflectionPrompt: 'Tuliskan satu langkah pertama dalam peta jalan cita-citamu yang bisa langsung kamu mulai minggu ini!',
    published: true,
    authorId: 'system-bk'
  }
];

export const GRADE_9_QUIZZES: MaterialQuiz[] = [
  {
    id: 'quiz-mat-ix-01',
    materialId: 'mat-ix-01',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Pilihan jalur pendidikan menengah formal utama setelah lulus SMP di Indonesia adalah...',
        options: [
          'SMA, SMK, MA, dan MAK',
          'Langsung masuk program magister (S2)',
          'Hanya kursus 1 minggu tanpa ijazah',
          'Kembali ke jenjang Sekolah Dasar'
        ],
        correctIndex: 0,
        explanation: 'Setelah SMP/MTs, siswa melanjutkan ke jenjang pendidikan menengah seperti SMA, SMK, MA, atau MAK.'
      },
      {
        id: 'q2',
        question: 'Apakah kedudukan ijazah SMA, SMK, dan MA sama-sama diakui sebagai lulusan pendidikan menengah?',
        options: [
          'Ya, ketiganya setara sebagai pendidikan menengah 12 tahun',
          'Tidak, hanya ijazah SMA yang diakui negara',
          'Hanya ijazah SMK yang boleh dipakai mendaftar kerja',
          'MA tidak diakui sebagai sekolah menengah'
        ],
        correctIndex: 0,
        explanation: 'SMA, SMK, dan MA memiliki kedudukan hukum yang setara sebagai jenjang pendidikan menengah atas.'
      },
      {
        id: 'q3',
        question: 'Mengapa siswa kelas IX perlu mengenal semua pilihan sekolah menengah?',
        options: [
          'Supaya bisa menentukan pilihan yang paling cocok dengan minat, kondisi, dan tujuan belajarnya',
          'Agar bingung dan tidak mendaftar ke mana-mana',
          'Untuk membandingkan mana sekolah yang paling mahal',
          'Karena semua sekolah punya kurikulum yang identik 100%'
        ],
        correctIndex: 0,
        explanation: 'Pemahaman menyeluruh membantu siswa memilih lingkungan belajar yang paling mendukung potensinya.'
      },
      {
        id: 'q4',
        question: 'Lembaga di bawah Kementerian Agama yang setara dengan SMA adalah...',
        options: [
          'Madrasah Aliyah (MA)',
          'Sekolah Dasar Luar Biasa',
          'Politeknik Negeri',
          'Balai Latihan Kerja'
        ],
        correctIndex: 0,
        explanation: 'MA adalah jenjang pendidikan menengah umum berciri khas Islam di bawah binaan Kementerian Agama.'
      },
      {
        id: 'q5',
        question: 'Jalur pendidikan kesetaraan setingkat SMA untuk masyarakat yang membutuhkan fleksibilitas belajar disebut...',
        options: [
          'Program Paket C',
          'Program Paket A',
          'Program Doktor',
          'Pendidikan Anak Usia Dini'
        ],
        correctIndex: 0,
        explanation: 'Paket C merupakan layanan pendidikan kesetaraan jenjang menengah atas.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-02',
    materialId: 'mat-ix-02',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Ciri khas utama SMK dibandingkan SMA adalah...',
        options: [
          'Adanya porsi praktik kejuruan yang besar dan Praktik Kerja Lapangan (PKL)',
          'Tidak belajar Bahasa Indonesia sama sekali',
          'Masa sekolah hanya 1 tahun',
          'Tidak ada ujian kelulusan'
        ],
        correctIndex: 0,
        explanation: 'SMK menekankan penguasaan kompetensi praktik kerja spesifik melalui bengkel/lab dan PKL.'
      },
      {
        id: 'q2',
        question: 'Siswa yang ingin melanjutkan kuliah ke jurusan kedokteran atau hukum umumnya lebih cocok memilih...',
        options: [
          'SMA atau MA yang fokus pada penguatan akademik umum',
          'Berhenti sekolah setelah SMP',
          'Mengambil pelatihan mengemudi saja',
          'Menunggu tanpa mendaftar sekolah'
        ],
        correctIndex: 0,
        explanation: 'Kurikulum SMA/MA memperkuat dasar keilmuan teoretis dan akademik yang menunjang berbagai jurusan kuliah.'
      },
      {
        id: 'q3',
        question: 'Apa perbedaan utama MA dengan SMA?',
        options: [
          'MA memuat kurikulum umum setara SMA ditambah pendalaman mata pelajaran agama Islam dan bahasa Arab',
          'MA hanya belajar olahraga',
          'Lulusan MA tidak bisa ikut seleksi universitas negeri',
          'MA hanya berlangsung selama 2 tahun'
        ],
        correctIndex: 0,
        explanation: 'MA memadukan materi pengetahuan umum setara SMA dengan porsi pendidikan agama Islam yang lebih mendalam.'
      },
      {
        id: 'q4',
        question: 'Peluang lulusan SMK dikenal dengan konsep BMW, yaitu...',
        options: [
          'Bekerja, Melanjutkan kuliah, atau Wirausaha',
          'Bermain, Menggambar, dan Wisata',
          'Berhenti, Menunggu, dan Wacana',
          'Belajar Matematika Wajib saja'
        ],
        correctIndex: 0,
        explanation: 'Lulusan SMK dibekali pilihan untuk langsung bekerja, melanjutkan studi ke perguruan tinggi, atau berwirausaha.'
      },
      {
        id: 'q5',
        question: 'Kunci menentukan antara SMA, SMK, atau MA adalah...',
        options: [
          'Kesesuaian antara minat, gaya belajar (teori vs praktik), serta rencana jangka menengah siswa',
          'Mengikuti pilihan mayoritas tetangga',
          'Memilih yang paling sedikit tugasnya',
          'Menghindari diskusi dengan orang tua'
        ],
        correctIndex: 0,
        explanation: 'Keputusan harus berangkat dari kesiapan belajar dan tujuan pribadi siswa.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-03',
    materialId: 'mat-ix-03',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Jalur penerimaan murid baru sekolah negeri yang mempertimbangkan kedekatan tempat tinggal disebut...',
        options: [
          'Jalur Domisili / Zonasi',
          'Jalur Acak Nasional',
          'Jalur Pekerjaan',
          'Jalur Undian'
        ],
        correctIndex: 0,
        explanation: 'Jalur domisili/zonasi memprioritaskan jarak tempat tinggal calon murid dengan sekolah sesuai aturan daerah.'
      },
      {
        id: 'q2',
        question: 'Jalur pendaftaran yang disiapkan untuk siswa dengan capaian rapor unggul atau kejuaraan resmi adalah...',
        options: [
          'Jalur Prestasi',
          'Jalur Mutasi',
          'Jalur Afirmasi',
          'Jalur Pekerja'
        ],
        correctIndex: 0,
        explanation: 'Jalur prestasi menilai rekam nilai rapor dan/atau sertifikat prestasi akademik maupun non-akademik.'
      },
      {
        id: 'q3',
        question: 'Agar tidak tertipu berita hoaks jadwal pendaftaran sekolah menengah, siswa sebaiknya...',
        options: [
          'Memeriksa situs resmi dinas pendidikan, kementerian, atau pengumuman resmi Guru BK',
          'Mempercayai pesan berantai tanpa tautan resmi',
          'Mengikuti rumor di kolom komentar media sosial',
          'Menunggu hingga pendaftaran sudah tutup'
        ],
        correctIndex: 0,
        explanation: 'Jadwal dan syarat penerimaan siswa baru resmi selalu dirilis oleh Dinas Pendidikan atau sekolah penyelenggara.'
      },
      {
        id: 'q4',
        question: 'Jalur pendidikan tinggi yang fokus pada keterampilan terapan (D3/D4) setelah SMA/SMK disebut...',
        options: [
          'Pendidikan Vokasi / Politeknik',
          'Sekolah Dasar',
          'Pendidikan Kesetaraan Paket A',
          'Taman Kanak-kanak'
        ],
        correctIndex: 0,
        explanation: 'Politeknik dan sekolah vokasi menyelenggarakan pendidikan tinggi berbasis praktik terapan.'
      },
      {
        id: 'q5',
        question: 'Apa tujuan adanya Jalur Afirmasi pada penerimaan murid baru?',
        options: [
          'Memberikan akses pendidikan yang adil bagi siswa dari keluarga ekonomi tidak mampu dan penyandang disabilitas',
          'Hanya untuk siswa yang rumahnya paling jauh',
          'Hanya untuk siswa pindahan luar negeri',
          'Mengurangi jumlah siswa bersekolah'
        ],
        correctIndex: 0,
        explanation: 'Jalur afirmasi menjamin pemerataan kesempatan pendidikan bagi kelompok yang membutuhkan dukungan akses.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-04',
    materialId: 'mat-ix-04',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Mengapa memilih sekolah hanya karena ikut-ikutan sahabat dekat berisiko kurang tepat?',
        options: [
          'Karena minat, potensi, dan rencana masa depan setiap siswa berbeda-beda',
          'Karena persahabatan langsung putus jika beda sekolah',
          'Karena siswa dilarang berteman dengan sekolah lain',
          'Karena semua sekolah pasti menolak pendaftar berkelompok'
        ],
        correctIndex: 0,
        explanation: 'Persahabatan tetap bisa terjaga meski bersekolah di tempat berbeda sesuai minat masing-masing.'
      },
      {
        id: 'q2',
        question: 'Lima faktor penting dalam memilih sekolah lanjutan mencakup...',
        options: [
          'Minat/bakat, kekuatan belajar, jurusan tersedia, dukungan keluarga & jarak, serta prospek lulusan',
          'Hanya warna seragam sekolah',
          'Hanya kepopuleran kantinnya',
          'Pilihan acak tanpa survei'
        ],
        correctIndex: 0,
        explanation: 'Pertimbangan menyeluruh menjaga kenyamanan belajar dan kesiapan biaya serta jarak tempuh selama 3 tahun.'
      },
      {
        id: 'q3',
        question: 'Bagaimana cara mengenal kondisi nyata sekolah tujuan sebelum mendaftar?',
        options: [
          'Mengikuti open house, bertanya pada Guru BK atau alumni, dan membaca situs resmi sekolah',
          'Menebak-nebak dari namanya saja',
          'Mendengarkan gosip yang tidak jelas sumbernya',
          'Tidak mencari tahu sama sekali'
        ],
        correctIndex: 0,
        explanation: 'Informasi langsung dari sekolah dan alumni membantu memastikan kecocokan fasilitas serta program belajarnya.'
      },
      {
        id: 'q4',
        question: 'Jika terjadi perbedaan pendapat pilihan sekolah dengan orang tua, langkah terbaik adalah...',
        options: [
          'Berdiskusi sopan dengan membawa data minat, rencana belajar, dan melibatkan Guru BK jika perlu',
          'Bertengkar lalu menolak mendaftar sekolah',
          'Menyembunyikan jadwal pendaftaran dari orang tua',
          'Menyerah tanpa menyampaikan alasan pribadi'
        ],
        correctIndex: 0,
        explanation: 'Komunikasi terbuka berbasis data membantu orang tua memahami keseriusan rencana masa depan anak.'
      },
      {
        id: 'q5',
        question: 'Peran hasil tes minat RIASEC dalam memilih sekolah lanjutan adalah...',
        options: [
          'Sebagai alat bantu refleksi awal untuk melihat kecenderungan minat, bukan penentu mutlak',
          'Sebagai vonis permanen yang tidak boleh dibantah',
          'Menggantikan nilai rapor dan wawancara',
          'Hanya sebagai hiasan profil'
        ],
        correctIndex: 0,
        explanation: 'Hasil tes minat membantu memetakan kecenderungan, lalu dipadukan dengan nilai rapor, hobi, dan diskusi.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-05',
    materialId: 'mat-ix-05',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Pada Kurikulum Merdeka di SMA, kapan siswa mulai mengambil mata pelajaran pilihan sesuai minat karier?',
        options: [
          'Mulai kelas XI setelah menempuh pelajaran umum dasar di kelas X',
          'Sejak kelas VII SMP',
          'Setelah lulus kelas XII',
          'Tidak ada mata pelajaran pilihan sama sekali'
        ],
        correctIndex: 0,
        explanation: 'Kelas X SMA memberi penguatan fondasi umum agar siswa lebih matang memilih mata pelajaran di kelas XI.'
      },
      {
        id: 'q2',
        question: 'Di SMK, istilah jurusan spesifik yang dipelajari siswa secara mendalam disebut...',
        options: [
          'Konsentrasi Keahlian',
          'Ekstrakurikuler Bebas',
          'Mata Pelajaran Pengganti',
          'Program Pengenalan Kampus'
        ],
        correctIndex: 0,
        explanation: 'Program keahlian di SMK terbagi lagi menjadi konsentrasi keahlian yang lebih fokus pada kompetensi kerja tertentu.'
      },
      {
        id: 'q3',
        question: 'Siswa SMA yang bercita-cita kuliah Teknik Sipil sebaiknya mempertimbangkan mata pelajaran pilihan...',
        options: [
          'Matematika Tingkat Lanjut dan Fisika',
          'Hanya Seni Tari tanpa Matematika',
          'Bahasa Daerah saja',
          'Penjaskes saja'
        ],
        correctIndex: 0,
        explanation: 'Teknik sipil membutuhkan dasar kuat pada perhitungan fisika struktur dan matematika lanjut.'
      },
      {
        id: 'q4',
        question: 'Mengapa penting menyambungkan pilihan jurusan sekolah menengah dengan rencana pasca lulus?',
        options: [
          'Agar bekal pengetahuan dan keterampilan selama 3 tahun nyambung dengan target kuliah atau kerja',
          'Supaya tidak perlu belajar lagi setelah kelas X',
          'Agar tidak boleh berganti hobi',
          'Hanya untuk formalitas rapor'
        ],
        correctIndex: 0,
        explanation: 'Kesesuaian mata pelajaran pilihan memudahkan proses belajar di perguruan tinggi maupun dunia kerja.'
      },
      {
        id: 'q5',
        question: 'Contoh konsentrasi keahlian di bawah program Desain Komunikasi Visual adalah...',
        options: [
          'Desain grafis, fotografi komersial, atau ilustrasi media',
          'Perawatan mesin kapal tanker',
          'Budidaya ikan laut dalam',
          'Keperawatan geriatri'
        ],
        correctIndex: 0,
        explanation: 'DKV berfokus pada komunikasi pesan melalui media visual, desain, dan fotografi.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-06',
    materialId: 'mat-ix-06',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Mengapa siswa kelas IX perlu menyiapkan Plan A dan Plan B saat mendaftar sekolah lanjutan?',
        options: [
          'Sebagai langkah bijak mengantisipasi ketatnya persaingan daya tampung sekolah tujuan pertama',
          'Karena siswa harus masuk dua sekolah sekaligus',
          'Supaya tidak usah belajar serius di semester genap',
          'Agar bisa membatalkan kelulusan SMP'
        ],
        correctIndex: 0,
        explanation: 'Memiliki pilihan cadangan yang tetap sesuai minat mencegah rasa panik jika kuota pilihan pertama penuh.'
      },
      {
        id: 'q2',
        question: 'Dokumen apa yang sebaiknya diperiksa kelengkapan dan kesesuaian datanya sejak awal kelas IX?',
        options: [
          'Akta kelahiran, Kartu Keluarga, NISN, rapor semester 1-5, dan sertifikat prestasi resmi',
          'Bukti struk belanja di kantin',
          'Tiket bioskop bulan lalu',
          'Kartu permainan daring'
        ],
        correctIndex: 0,
        explanation: 'Memastikan data identitas dan rapor sinkron sejak awal menghindarkan kendala administratif saat pendaftaran.'
      },
      {
        id: 'q3',
        question: 'Jika ada perbedaan penulisan nama pada rapor dan Kartu Keluarga, langkah yang benar adalah...',
        options: [
          'Segera melapor kepada wali kelas atau tata usaha sekolah untuk perbaikan resmi',
          'Mencoret sendiri memakai pulpen di rumah',
          'Membiarkannya sampai pendaftaran ditutup',
          'Membuat akun baru dengan nama palsu'
        ],
        correctIndex: 0,
        explanation: 'Perubahan data kependudukan dan rapor hanya sah jika diproses resmi melalui sekolah dan instansi terkait.'
      },
      {
        id: 'q4',
        question: 'Kapan waktu ideal mendiskusikan rencana pendidikan lanjutan bersama orang tua?',
        options: [
          'Sejak semester ganjil kelas IX agar ada waktu survei dan persiapan bersama',
          'Satu jam sebelum penutupan loket pendaftaran',
          'Setelah tahun ajaran baru dimulai',
          'Tidak perlu berdiskusi dengan orang tua'
        ],
        correctIndex: 0,
        explanation: 'Diskusi lebih awal memberi kesempatan bagi orang tua mempersiapkan dukungan moral dan teknis.'
      },
      {
        id: 'q5',
        question: 'Prinsip utama dalam menyusun Plan B sekolah lanjutan adalah...',
        options: [
          'Plan B tetap harus selaras dengan minat dan kondisi nyata siswa, bukan asal pilih',
          'Memilih sekolah tanpa tahu alamat dan jurusannya',
          'Memilih sekolah hanya karena seragamnya unik',
          'Menolak semua sekolah swasta tanpa melihat kualitasnya'
        ],
        correctIndex: 0,
        explanation: 'Baik sekolah negeri maupun swasta yang bermutu dan sesuai minat sama-sama layak menjadi rencana yang baik.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-07',
    materialId: 'mat-ix-07',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Langkah pertama dalam strategi memilih karier saat bingung di antara dua pilihan adalah...',
        options: [
          'Mengumpulkan data diri meliputi minat, kemampuan mata pelajaran, dan pengalaman aktivitas',
          'Melempar koin untuk menentukan nasib masa depan',
          'Menghindari semua informasi tentang profesi',
          'Menyerahkan keputusan sepenuhnya pada teman sebaya'
        ],
        correctIndex: 0,
        explanation: 'Data objektif tentang diri sendiri menjadi pijakan utama dalam menimbang alternatif pilihan.'
      },
      {
        id: 'q2',
        question: 'Mengapa bertanya kepada alumni atau praktisi profesi membantu siswa menentukan pilihan?',
        options: [
          'Kita mendapat gambaran nyata tantangan dan keseharian dari bidang tersebut, bukan sekadar bayangan',
          'Agar mereka mengerjakan tugas sekolah kita',
          'Supaya tidak perlu bersekolah lagi',
          'Untuk meniru gaji mereka secara instan'
        ],
        correctIndex: 0,
        explanation: 'Wawancara singkat atau berbagi pengalaman mengungkap realitas di balik sebuah jurusan atau pekerjaan.'
      },
      {
        id: 'q3',
        question: 'Apa manfaat mencoba proyek atau kegiatan kecil terkait dua bidang yang diminati?',
        options: [
          'Menguji bidang mana yang paling membuat kita menikmati proses dan tantangannya',
          'Membuang-buang waktu belajar',
          'Membuktikan bahwa siswa tidak punya bakat',
          'Membuat tugas kelas bertambah tanpa tujuan'
        ],
        correctIndex: 0,
        explanation: 'Pengalaman langsung jauh lebih akurat membantu pengambilan keputusan dibandingkan menebak di atas kertas.'
      },
      {
        id: 'q4',
        question: 'Peran Guru BK saat siswa bingung memilih antara dua jalur sekolah adalah...',
        options: [
          'Membantu memetakan pro-kontra secara objektif dan memfasilitasi refleksi bersama siswa',
          'Memaksa siswa memilih satu jurusan yang tidak disukainya',
          'Memarahi siswa karena belum punya keputusan',
          'Melarang siswa bermimpi tinggi'
        ],
        correctIndex: 0,
        explanation: 'Konseling karier bersifat memfasilitasi kemandirian siswa dalam mengambil keputusan terbaik bagi dirinya.'
      },
      {
        id: 'q5',
        question: 'Pernyataan manakah yang mencerminkan strategi karier yang sehat?',
        options: [
          'Memadukan suara hati (minat), bukti kemampuan, riset informasi resmi, dan dukungan keluarga',
          'Mengabaikan kondisi kesehatan dan kemampuan diri',
          'Memilih hanya berdasarkan tren viral satu minggu',
          'Takut mencoba karena takut salah langkah'
        ],
        correctIndex: 0,
        explanation: 'Keseimbangan antara refleksi internal dan realitas eksternal menghasilkan keputusan karier yang matang.'
      }
    ]
  },
  {
    id: 'quiz-mat-ix-08',
    materialId: 'mat-ix-08',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa fungsi Peta Jalan Cita-Cita (Career Roadmap) bagi siswa kelas IX?',
        options: [
          'Sebagai panduan bertahap yang menghubungkan langkah hari ini dengan target jangka menengah dan panjang',
          'Sebagai kontrak hukum yang tidak boleh direvisi',
          'Sebagai pengganti ijazah kelulusan',
          'Untuk menunda persiapan masuk SMA/SMK'
        ],
        correctIndex: 0,
        explanation: 'Peta jalan memecah impian besar menjadi langkah-langkah kecil yang jelas dan bisa langsung dikerjakan.'
      },
      {
        id: 'q2',
        question: 'Tahap jangka sangat pendek dalam peta jalan siswa kelas IX berisi...',
        options: [
          'Menjaga kestabilan nilai rapor, melatih kebiasaan belajar, dan menyiapkan berkas seleksi sekolah',
          'Membeli rumah dan mobil pribadi',
          'Memilih program pensiun kerja',
          'Mengabaikan ujian sekolah'
        ],
        correctIndex: 0,
        explanation: 'Target jangka sangat pendek berfokus pada apa yang ada di depan mata di semester kelas IX.'
      },
      {
        id: 'q3',
        question: 'Bolehkah peta jalan cita-cita disesuaikan di kemudian hari saat sudah duduk di SMA atau SMK?',
        options: [
          'Boleh, peta jalan bersifat fleksibel mengikuti perkembangan minat, pengalaman baru, dan peluang',
          'Tidak boleh diubah sama sekali sejak SMP',
          'Hanya boleh diubah jika pindah ke luar negeri',
          'Harus dibakar jika ada satu kendala'
        ],
        correctIndex: 0,
        explanation: 'Peta jalan adalah kompas hidup yang dapat dievaluasi dan diperbarui seiring pertumbuhan diri.'
      },
      {
        id: 'q4',
        question: 'Target jangka menengah (selama kelas X–XII) yang baik untuk dicantumkan dalam peta jalan adalah...',
        options: [
          'Aktif mengembangkan keterampilan di ekstrakurikuler, lomba, atau PKL yang relevan dengan minat',
          'Berhenti bersosialisasi selama tiga tahun',
          'Menghindari semua kegiatan pengembangan diri',
          'Menunggu lulus tanpa target keterampilan'
        ],
        correctIndex: 0,
        explanation: 'Masa sekolah menengah adalah waktu membangun portofolio, karakter, dan jejaring positif.'
      },
      {
        id: 'q5',
        question: 'Apa langkah paling penting setelah selesai menulis peta jalan cita-cita?',
        options: [
          'Memulai satu aksi kecil pertama hari ini dengan konsisten',
          'Menyimpannya di laci dan melupakannya',
          'Menunggu orang lain mengerjakannya untuk kita',
          'Menunggu tanggal 1 Januari tahun depan'
        ],
        correctIndex: 0,
        explanation: 'Perubahan nyata dimulai dari satu langkah konkret yang dilakukan secara konsisten hari ini.'
      }
    ]
  }
];
