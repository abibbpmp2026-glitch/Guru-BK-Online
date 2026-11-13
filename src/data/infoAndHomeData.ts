import { Announcement, InfoArticle, MaterialCategory, SiteSetting } from '../types/bicara';

const IMG_INFO = '/src/assets/images/info_terkini_cover_1794573084483.jpg';
const IMG_VII = '/src/assets/images/materi_kelas_7_1794573084191.jpg';
const IMG_VIII = '/src/assets/images/materi_kelas_8_1794573084599.jpg';
const IMG_IX = '/src/assets/images/materi_kelas_9_1794573084699.jpg';

export const INITIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'cat-vii-mengenal-diri',
    name: 'Mengenal Diri',
    grade: 'VII',
    description: 'Fondasi pengenalan potensi, minat, bakat, nilai kehidupan, dan ragam profesi untuk siswa kelas VII.',
    order: 1
  },
  {
    id: 'cat-viii-eksplorasi',
    name: 'Eksplorasi Karier',
    grade: 'VIII',
    description: 'Pengenalan dunia kerja, kelompok profesi, keahlian SMK, peluang era digital, dan kewirausahaan.',
    order: 2
  },
  {
    id: 'cat-ix-rencana-masa-depan',
    name: 'Merencanakan Masa Depan',
    grade: 'IX',
    description: 'Perbandingan SMA/SMK/MA, jalur penerimaan murid baru, strategi karier, dan penyusunan peta jalan.',
    order: 3
  }
];

export const INITIAL_ARTICLES: InfoArticle[] = [
  {
    id: 'info-01',
    title: 'Panduan Portal Resmi Sistem Penerimaan Murid Baru (SPMB/PPDB) Jenjang SMA & SMK',
    category: 'Penerimaan Murid Baru',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Ketahui jalur seleksi resmi (Domisili, Afirmasi, Prestasi, dan Mutasi) serta cara memverifikasi jadwal penerimaan melalui laman resmi Kementerian dan Dinas Pendidikan daerah.',
    content:
      'Setiap tahun ajaran baru, ketentuan teknis Sistem Penerimaan Murid Baru (SPMB/PPDB) ditetapkan oleh Kementerian Pendidikan Dasar dan Menengah serta dijabarkan oleh Dinas Pendidikan Provinsi masing-masing untuk jenjang SMA dan SMK.\n\nSiswa kelas IX dan orang tua diimbau selalu merujuk pada laman resmi Dinas Pendidikan provinsi setempat atau situs resmi sekolah tujuan untuk memastikan tanggal pendaftaran, daya tampung, persyaratan dokumen (seperti Kartu Keluarga, Akta Kelahiran, NISN, dan rapor), serta aturan jalur domisili, afirmasi, prestasi, maupun mutasi.\n\nHindari mempercayai informasi berantai yang tidak mencantumkan tautan resmi pemerintah (.go.id). Jika memerlukan pendampingan membaca syarat pendaftaran, siswa dapat menghubungi Guru BK sekolah.',
    sourceName: 'Kementerian Pendidikan Dasar dan Menengah RI (Kemendikdasmen)',
    sourceUrl: 'https://www.kemdikbud.go.id/',
    imageUrl: IMG_IX,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-02',
    title: 'Mengenal Program Indonesia Pintar (PIP) untuk Dukungan Biaya Pendidikan Pelajar',
    category: 'Beasiswa',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Informasi resmi mengenai bantuan biaya pendidikan Program Indonesia Pintar (PIP) bagi siswa SMP hingga SMA/SMK agar dapat terus melanjutkan sekolah tanpa kendala biaya.',
    content:
      'Program Indonesia Pintar (PIP) adalah bantuan uang tunai, perluasan akses, dan kesempatan belajar dari pemerintah bagi peserta didik yang berasal dari keluarga miskin atau rentan miskin untuk membiayai pendidikan.\n\nMelalui laman resmi PIP, siswa dan orang tua dapat memeriksa informasi mekanisme pengusulan melalui sekolah atau dinas terkait serta panduan penggunaan dana untuk kebutuhan perlengkapan belajar siswa.\n\nPastikan data NISN dan identitas kependudukan siswa di Dapodik sekolah selalu mutakhir. Untuk pengecekan status penerima resmi, gunakan langsung portal resmi PIP Kementerian Pendidikan.',
    sourceName: 'Portal Resmi Program Indonesia Pintar (Kemendikdasmen)',
    sourceUrl: 'https://pip.kemdikbud.go.id/',
    imageUrl: IMG_INFO,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-03',
    title: 'Informasi Resmi Ajang Talenta Nasional Siswa SMP: OSN, O2SN, dan FLS2N',
    category: 'Lomba & Prestasi',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Mengenal kompetisi resmi berjenjang di bawah Pusat Prestasi Nasional (Puspresnas) mulai dari sains, olahraga, hingga seni budaya sebagai wadah mengembangkan bakat dan portofolio prestasi.',
    content:
      'Pusat Prestasi Nasional (Puspresnas) secara rutin menyelenggarakan ajang talenta resmi bagi siswa SMP di seluruh Indonesia, antara lain Olimpiade Sains Nasional (OSN), Olimpiade Olahraga Siswa Nasional (O2SN), dan Festival Lomba Seni Siswa Nasional (FLS2N).\n\nKeikutsertaan dalam lomba berjenjang resmi tidak hanya melatih kepercayaan diri dan sportivitas, tetapi juga dapat tercatat dalam Sistem Informasi Manajemen Talenta (SIMT) serta menjadi nilai tambah saat mengikuti jalur prestasi ke jenjang SMA/SMK/MA.\n\nSiswa kelas VII dan VIII dapat berkonsultasi dengan guru pembina ekstrakurikuler dan Guru BK untuk mengetahui jadwal seleksi tingkat sekolah dan kabupaten/kota di laman resmi Puspresnas.',
    sourceName: 'Pusat Prestasi Nasional (Puspresnas)',
    sourceUrl: 'https://pusatprestasinasional.kemdikbud.go.id/',
    imageUrl: IMG_VII,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-04',
    title: 'Mengenal Pendidikan Vokasi dan Daftar Program Keahlian SMK di Indonesia',
    category: 'SMA & SMK',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Telusuri informasi resmi mengenai kurikulum pendidikan vokasi, keunggulan praktik kerja lapangan (PKL), serta pengembangan SMK Pusat Keunggulan.',
    content:
      'Direktorat Jenderal Pendidikan Vokasi menyediakan panduan mengenai spektrum keahlian SMK, mulai dari bidang Teknologi Manufaktur, Energi, Teknologi Informasi, Kesehatan, Bisnis Manajemen, Pariwisata, hingga Ekonomi Kreatif.\n\nMelalui pendidikan vokasi, siswa dibekali pengalaman praktik berstandar industri dan sertifikasi kompetensi. Lulusan SMK didorong memiliki kesiapan pada tiga jalur utama: bekerja, melanjutkan pendidikan tinggi (politeknik maupun universitas), atau berwirausaha.\n\nGunakan portal resmi Direktorat SMK / Pendidikan Vokasi bersama orang tua untuk mengenal profil program keahlian sebelum masa pendaftaran sekolah menengah.',
    sourceName: 'Direktorat Jenderal Pendidikan Vokasi',
    sourceUrl: 'https://vokasi.kemdikbud.go.id/',
    imageUrl: IMG_VIII,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-05',
    title: 'Informasi Madrasah Aliyah (MA) dan Madrasah Aliyah Kejuruan (MAK) Resmi Kemenag',
    category: 'Pendidikan Lanjutan',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Gambaran pilihan sekolah menengah berciri khas Islam di bawah Kementerian Agama RI, termasuk Madrasah Aliyah Negeri (MAN) Insan Cendekia dan MA Keterampilan.',
    content:
      'Selain SMA dan SMK di bawah Dinas Pendidikan, siswa lulusan SMP/MTs juga dapat melanjutkan pendidikan ke Madrasah Aliyah (MA) maupun Madrasah Aliyah Kejuruan (MAK) di bawah pembinaan Kementerian Agama Republik Indonesia.\n\nTerdapat pula program madrasah unggulan seperti MAN Insan Cendekia (fokus riset dan sains), MAN Program Keagamaan, serta MA Plus Keterampilan. Informasi mengenai seleksi masuk madrasah unggulan dan daftar madrasah terakreditasi dipublikasikan melalui kanal resmi Direktorat KSKK Madrasah Kemenag RI.',
    sourceName: 'Kementerian Agama RI — Direktorat KSKK Madrasah',
    sourceUrl: 'https://madrasah.kemenag.go.id/',
    imageUrl: IMG_INFO,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-06',
    title: 'Mengenal Sekolah Kedinasan dan Persiapannya Sejak Awal Masa Remaja',
    category: 'Sekolah Kedinasan',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Penjelasan umum mengenai apa itu perguruan tinggi kedinasan milik kementerian/lembaga pemerintah dan syarat dasar yang dapat dipersiapkan sejak bangku sekolah.',
    content:
      'Sekolah Kedinasan adalah perguruan tinggi yang dikelola oleh kementerian atau lembaga pemerintah (seperti bidang keuangan negara, statistika, meteorologi, transportasi, keimigrasian, dan pemerintahan dalam negeri) yang pendaftarannya dilakukan setelah lulus SMA/MA atau SMK tertentu.\n\nMeski pendaftaran baru dilakukan setelah lulus sekolah menengah atas, siswa SMP yang tertarik dapat mulai mempersiapkan diri dengan menjaga kesehatan fisik, kedisiplinan, penguasaan matematika dasar, bahasa Indonesia, dan bahasa Inggris.\n\nInformasi resmi pembukaan seleksi sekolah kedinasan setiap tahun diumumkan terpusat melalui portal SSCASN Dikdin milik Badan Kepegawaian Negara (BKN) dan situs resmi masing-masing kementerian.',
    sourceName: 'Badan Kepegawaian Negara (Portal Resmi DIKDIN BKN)',
    sourceUrl: 'https://dikdin.bkn.go.id/',
    imageUrl: IMG_IX,
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'info-07',
    title: 'Keterampilan Digital dan Keamanan Siber untuk Generasi Muda Indonesia',
    category: 'Profesi & Keterampilan Digital',
    publishedDateLabel: 'Diperbarui oleh Admin BK · Portal Resmi Pemerintah',
    updatedAtLabel: 'Verifikasi Sumber Resmi',
    summary:
      'Pelajari keterampilan literasi digital, keamanan data pribadi, dan arah kompetensi teknologi masa depan melalui program resmi literasi digital nasional.',
    content:
      'Transformasi digital di Indonesia menuntut generasi muda tidak hanya mahir menggunakan aplikasi, tetapi juga cakap memahami etika digital, keamanan informasi pribadi, berpikir komputasional, dan kreativitas produktif.\n\nKementerian Komunikasi dan Digital (Komdigi) melalui berbagai program literasi digital dan pengembangan talenta digital menyediakan modul pembelajaran terbuka serta panduan internet aman bagi pelajar, orang tua, dan pendidik.\n\nSebagai siswa SMP, mulailah membiasakan diri memverifikasi sumber informasi, menjaga kerahasiaan akun, dan memanfaatkan internet untuk mencari sumber belajar terpercaya.',
    sourceName: 'Kementerian Komunikasi dan Digital RI (Komdigi)',
    sourceUrl: 'https://www.komdigi.go.id/',
    imageUrl: IMG_VIII,
    published: true,
    authorId: 'system-bk'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Jadwal Konsultasi Karier & Pemilihan Sekolah Kelas IX',
    message:
      'Siswa kelas IX dapat mengisi Tes Minat RIASEC terlebih dahulu sebelum menjadwalkan sesi diskusi perencanaan SMA/SMK/MA bersama Guru BK di ruang konseling.',
    targetGrade: 'IX',
    active: true,
    authorId: 'system-bk'
  },
  {
    id: 'ann-02',
    title: 'Selamat Datang di Layanan Digital BICARA BK',
    message:
      'Gunakan fitur Materi Karier, Tes Minat & Bakat, serta Sahabat BK AI dengan bijak. Semua percakapan pribadimu dengan Sahabat BK AI bersifat privat dan tidak ditampilkan otomatis kepada admin.',
    targetGrade: 'Semua',
    active: true,
    authorId: 'system-bk'
  }
];

export const INITIAL_SITE_SETTING: SiteSetting = {
  id: 'home',
  heroHeadline: 'Kenali Potensimu, Rancang Masa Depanmu Sejak SMP',
  heroSubheadline:
    'Platform bimbingan karier dan konseling digital untuk siswa kelas VII, VIII, dan IX. Eksplorasi minat RIASEC, pelajari modul karier interaktif, dan berdiskusi aman bersama Sahabat BK AI.',
  motivationQuote:
    'Masa depan tidak ditentukan oleh kebetulan semata, melainkan oleh langkah-langkah kecil penuh kesadaran yang kamu mulai hari ini.',
  motivationAuthor: 'Tim Bimbingan dan Konseling BICARA BK',
  featuredTip:
    'Luangkan 15 menit minggu ini untuk menyelesaikan satu modul materi kelasmu dan mencatat refleksi pribadimu.'
};
