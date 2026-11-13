import { CareerMaterial, MaterialQuiz } from '../types/bicara';

const IMG_VII = '/src/assets/images/materi_kelas_7_1794573084191.jpg';

export const GRADE_7_MATERIALS: CareerMaterial[] = [
  {
    id: 'mat-vii-01',
    title: 'Apa Itu Bimbingan Karier?',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Memahami pengertian bimbingan karier serta manfaatnya bagi siswa SMP sejak kelas VII.',
    imageUrl: IMG_VII,
    explanation:
      'Bimbingan karier bukan berarti kamu harus langsung mencari pekerjaan sekarang. Di bangku SMP, bimbingan karier adalah proses pendampingan untuk membantumu mengenal diri sendiri, memahami berbagai pilihan sekolah lanjutan, serta mengenal ragam profesi di dunia kerja.\n\nDengan mengikuti bimbingan karier sejak kelas VII, kamu tidak perlu bingung mendadak saat kelas IX nanti. Kamu belajar mengambil keputusan secara sadar berdasarkan minat, kemampuan, dan nilai hidupmu sendiri.',
    dailyExamples: [
      'Raka rutin berdiskusi dengan Guru BK tentang ekstrakurikuler mana yang cocok dengan rasa ingin tahunya di bidang sains.',
      'Sinta mencatat hal-hal yang paling membuatnya bersemangat setiap kali selesai mengerjakan proyek kelompok di sekolah.',
      'Siswa kelas VII mengikuti tes minat awal agar punya gambaran aktivitas apa yang disukai saat waktu luang.'
    ],
    reflectionPrompt: 'Menurutmu, mengapa mengenal arah masa depan perlu dimulai sejak kelas VII dan tidak menunggu lulus SMP?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-02',
    title: 'Mengenali Potensi Diri',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Mengidentifikasi potensi akademik, non-akademik, sosial, dan kepemimpinan yang ada dalam diri.',
    imageUrl: IMG_VII,
    explanation:
      'Potensi diri adalah kemampuan terpendam maupun kemampuan yang sudah terlihat dan masih bisa terus dikembangkan lewat latihan. Setiap siswa SMP memiliki potensi yang berbeda—ada yang kuat di logika berhitung, ada yang cekatan merakit barang, ada pula yang pandai menenangkan teman atau memimpin rapat OSIS.\n\nPotensi bukan hanya nilai rapor matematika atau IPA. Kemampuan mendengar dengan baik, menggambar sketsa, berbicara di depan kelas, dan mengatur jadwal piket juga termasuk potensi berharga.',
    dailyExamples: [
      'Nadia sering diminta menjadi moderator diskusi kelas karena suaranya jelas dan mampu merangkum pendapat teman-temannya.',
      'Dimas cepat memahami cara memperbaiki kabel headset atau sepeda yang rusak di rumah.',
      'Bagas teliti menyusun catatan kas kelas sehingga tidak pernah ada selisih hitung.'
    ],
    reflectionPrompt: 'Tuliskan 3 hal yang menurut teman atau keluargamu sering kamu lakukan dengan baik tanpa terasa berat.',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-03',
    title: 'Mengenal Minat dan Bakat',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Membedakan arti minat dan bakat serta cara menumbuhkan keduanya secara seimbang.',
    imageUrl: IMG_VII,
    explanation:
      'Minat adalah rasa ketertarikan atau kesukaan seseorang terhadap suatu aktivitas atau bidang tertentu. Ketika kamu berminat pada sesuatu, kamu merasa senang melakukannya bahkan tanpa disuruh.\n\nSementara itu, bakat adalah kemampuan bawaan atau kepekaan alami yang membuatmu lebih cepat menguasai keterampilan tertentu dibandingkan rata-rata orang seusiamu. Bakat yang tidak dilatih bisa tumpul, sedangkan minat yang tekun dilatih bisa berkembang menjadi keahlian hebat.',
    dailyExamples: [
      'Minat: Kamu betah berjam-jam menonton video cara membuat animasi 2D dan ingin mencobanya sendiri.',
      'Bakat: Baru dua kali mengikuti latihan bulu tangkis, gerak kaki dan pukulanmu sudah cepat terarah.',
      'Gabungan keduanya: Suka menulis cerita pendek (minat) lalu rutin ikut majalah dinding sekolah sehingga kemampuan merangkai kata makin terasah (bakat terlatih).'
    ],
    reflectionPrompt: 'Aktivitas apa yang paling sering kamu lakukan di waktu luang karena rasa suka, dan keterampilan apa yang terasa mudah kamu pelajari?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-04',
    title: 'Mengenali Kelebihan dan Kekurangan Diri',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Menerima kelebihan dengan rendah hati dan menyusun langkah nyata memperbaiki kekurangan diri.',
    imageUrl: IMG_VII,
    explanation:
      'Tidak ada manusia yang sempurna, termasuk pelajar berprestasi sekalipun. Mengenali kelebihan membuatmu percaya diri saat berkarya, sedangkan mengakui kekurangan membuatmu tahu bagian mana yang perlu dilatih atau dibantu orang lain.\n\nAlih-alih merasa minder karena sebuah kekurangan, ubahlah kekurangan menjadi daftar latihan. Misalnya, jika kamu mudah gugup saat presentasi, latihlah berbicara di depan cermin atau berpasangan dengan sahabat terlebih dahulu.',
    dailyExamples: [
      'Kelebihan: Rapi membuat catatan pelajaran; Kekurangan: Sering menunda belajar hingga malam sebelum ulangan.',
      'Kelebihan: Ramah dan mudah akrab; Kekurangan: Sulit menolak ajakan main saat tugas PR belum selesai.',
      'Langkah nyata: Membuat pengingat jadwal belajar 25 menit setiap sore untuk mengatasi kebiasaan menunda.'
    ],
    reflectionPrompt: 'Sebutkan satu kelebihan yang ingin kamu tingkatkan semester ini dan satu kebiasaan kurang baik yang ingin kamu perbaiki.',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-05',
    title: 'Mengenal Nilai-Nilai Kehidupan',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Memahami nilai kejujuran, tanggung jawab, kepedulian, dan kemandirian dalam memilih arah karier.',
    imageUrl: IMG_VII,
    explanation:
      'Nilai kehidupan adalah prinsip atau hal-hal yang kamu anggap paling penting dan benar dalam hidup. Nilai inilah yang menjadi kompas saat kamu harus memilih tindakan setiap hari.\n\nDalam dunia karier nanti, kepintaran saja tidak cukup. Kejujuran saat bekerja, kepedulian membantu sesama, disiplin waktu, dan kerja sama tim adalah nilai-nilai yang menentukan apakah seseorang dipercaya di lingkungan mana pun.',
    dailyExamples: [
      'Tidak menyontek saat ujian meskipun merasa soalnya sulit karena menjunjung nilai kejujuran.',
      'Mengembalikan buku perpustakaan tepat waktu sebagai wujud tanggung jawab.',
      'Memilih membantu teman sekelompok yang tertinggal materi agar seluruh tim berhasil bersama.'
    ],
    reflectionPrompt: 'Dari nilai kejujuran, kerja keras, kepedulian, dan kreativitas, dua nilai mana yang paling menggambarkan dirimu saat ini?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-06',
    title: 'Membangun Cita-Cita',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Menyusun cita-cita yang realistis, bermakna, dan memotivasi kebiasaan belajar sehari-hari.',
    imageUrl: IMG_VII,
    explanation:
      'Cita-cita adalah gambaran masa depan yang ingin kamu capai dan perjuangkan. Wajar sekali jika cita-citamu berubah seiring bertambahnya pengetahuanmu—itu tandanya wawasanmu makin luas!\n\nCita-cita yang baik bukan sekadar nama pekerjaan yang terdengar keren, melainkan profesi atau peran yang sesuai dengan minatmu dan memberi manfaat bagi orang lain. Mulailah dari hal kecil hari ini: membaca, bertanya, dan mencoba kegiatan positif.',
    dailyExamples: [
      'Bima ingin menjadi arsitek ramah lingkungan karena suka menggambar rumah dan peduli pada penghijauan.',
      'Tari bercita-cita menjadi guru olahraga karena senang melatih adik kelas saat senam pagi.',
      'Rizky menyiapkan "papan impian" sederhana di meja belajarnya berisi target nilai dan kebiasaan baik setiap bulan.'
    ],
    reflectionPrompt: 'Jika kamu bisa melakukan satu pekerjaan yang bermanfaat bagi masyarakat di masa depan, peran apa yang ingin kamu coba dan mengapa?',
    published: true,
    authorId: 'system-bk'
  },
  {
    id: 'mat-vii-07',
    title: 'Mengenal Berbagai Jenis Profesi',
    grade: 'VII',
    categoryId: 'cat-vii-mengenal-diri',
    categoryName: 'Mengenal Diri',
    learningObjective: 'Mengenal keberagaman profesi di sekitar sekolah, masyarakat, dan era modern.',
    imageUrl: IMG_VII,
    explanation:
      'Banyak anak hanya mengenal beberapa profesi populer seperti dokter, guru, polisi, atau pilot. Padahal di balik kehidupan sehari-hari kita ada ratusan jenis profesi yang saling melengkapi!\n\nAda profesi di bidang kesehatan (perawat, apoteker, ahli gizi), teknologi (pengembang aplikasi, teknisi jaringan), seni dan komunikasi (desainer grafis, jurnalis, animator), layanan publik, hingga bidang lingkungan dan pertanian modern. Setiap profesi mulia selama dilakukan dengan jujur dan sungguh-sungguh.',
    dailyExamples: [
      'Untuk menghasilkan satu buku pelajaran, terlibat penulis, editor bahasa, ilustrator, penata letak, hingga petugas percetakan.',
      'Di rumah sakit bukan hanya ada dokter, tetapi juga perawat, analis laboratorium, fisioterapis, dan teknisi alat medis.',
      'Di sekitar rumah kita ada pemilik usaha kuliner, montir bengkel, akuntan, dan penyuluh pertanian.'
    ],
    reflectionPrompt: 'Profesi apa yang baru kamu ketahui perannya setelah membaca materi ini dan membuatmu penasaran?',
    published: true,
    authorId: 'system-bk'
  }
];

export const GRADE_7_QUIZZES: MaterialQuiz[] = [
  {
    id: 'quiz-mat-vii-01',
    materialId: 'mat-vii-01',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa tujuan utama bimbingan karier bagi siswa kelas VII SMP?',
        options: [
          'Langsung bekerja penuh waktu sebelum lulus SMP',
          'Mengenal diri sendiri, pilihan sekolah lanjutan, dan ragam profesi sejak awal',
          'Menentukan satu profesi yang tidak boleh diubah selamanya',
          'Menggantikan semua pelajaran sekolah dengan latihan kerja'
        ],
        correctIndex: 1,
        explanation: 'Di kelas VII, bimbingan karier bertujuan membantu siswa mengenal potensi diri serta wawasan pendidikan dan profesi secara bertahap.'
      },
      {
        id: 'q2',
        question: 'Kapan waktu yang tepat mulai merencanakan minat dan arah masa depan?',
        options: [
          'Saat sudah lulus kuliah',
          'Sehari sebelum mendaftar SMA atau SMK',
          'Sejak kelas VII secara bertahap dan santai',
          'Hanya jika nilai rapor menurun'
        ],
        correctIndex: 2,
        explanation: 'Memulai eksplorasi sejak kelas VII memberi waktu cukup untuk mencoba ekstrakurikuler dan mengenal kekuatan diri.'
      },
      {
        id: 'q3',
        question: 'Siapa di sekolah yang dapat mendampingi siswa dalam bimbingan karier?',
        options: [
          'Hanya petugas keamanan sekolah',
          'Guru Bimbingan dan Konseling (BK) bersama wali kelas dan orang tua',
          'Teman sekelas saja tanpa pendampingan',
          'Tidak ada yang bisa diajak berdiskusi'
        ],
        correctIndex: 1,
        explanation: 'Guru BK merupakan pendamping profesional di sekolah yang berkolaborasi dengan wali kelas dan orang tua.'
      },
      {
        id: 'q4',
        question: 'Contoh aktivitas bimbingan karier yang tepat untuk siswa kelas VII adalah...',
        options: [
          'Menghafal gaji semua pekerjaan tanpa mengenal minat diri',
          'Mengikuti tes eksplorasi minat awal dan berdiskusi dengan Guru BK',
          'Berhenti mengikuti ekstrakurikuler',
          'Meniru pilihan teman tanpa pertimbangan'
        ],
        correctIndex: 1,
        explanation: 'Mengikuti eksplorasi minat dan berkonsultasi membantu siswa memahami kecenderungan dirinya sendiri.'
      },
      {
        id: 'q5',
        question: 'Mengapa keputusan karier perlu diambil secara sadar?',
        options: [
          'Agar sesuai dengan minat, kemampuan, dan nilai hidup diri sendiri',
          'Supaya sama persis dengan semua teman satu kelas',
          'Karena dipaksa mengikuti tren sesaat',
          'Agar tidak perlu belajar lagi di kelas VIII'
        ],
        correctIndex: 0,
        explanation: 'Keputusan yang selaras dengan minat dan potensi diri membuat proses belajar dan bekerja kelak lebih bermakna.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-02',
    materialId: 'mat-vii-02',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa yang dimaksud dengan potensi diri?',
        options: [
          'Hanya nilai ujian matematika yang sempurna',
          'Kemampuan yang sudah tampak maupun yang masih bisa dikembangkan dengan latihan',
          'Barang elektronik yang dimiliki siswa',
          'Hukuman yang diterima saat melanggar aturan'
        ],
        correctIndex: 1,
        explanation: 'Potensi mencakup kemampuan akademik, seni, teknis, sosial, dan kepemimpinan yang dapat terus diasah.'
      },
      {
        id: 'q2',
        question: 'Manakah yang termasuk contoh potensi sosial dan kepemimpinan di sekolah?',
        options: [
          'Bisa menengahi perbedaan pendapat saat diskusi kelompok dengan adil',
          'Selalu diam dan menolak bekerja sama',
          'Menyembunyikan catatan dari teman sekelompok',
          'Datang terlambat saat jadwal piket'
        ],
        correctIndex: 0,
        explanation: 'Kemampuan mendengarkan, menengahi konflik, dan mengoordinasikan kelompok merupakan potensi sosial dan kepemimpinan.'
      },
      {
        id: 'q3',
        question: 'Bagaimana sikap yang benar terhadap potensi diri yang masih terpendam?',
        options: [
          'Dibiarkan saja tanpa pernah dicoba',
          'Dilatih lewat kegiatan kelas, hobi, dan ekstrakurikuler',
          'Merasa malu jika belum mahir di percobaan pertama',
          'Menunggu hingga dewasa baru berlatih'
        ],
        correctIndex: 1,
        explanation: 'Potensi berkembang ketika diberi kesempatan berlatih melalui aktivitas nyata secara konsisten.'
      },
      {
        id: 'q4',
        question: 'Apakah potensi siswa SMP hanya diukur dari nilai ulangan tertulis?',
        options: [
          'Ya, selain nilai tertulis tidak penting',
          'Tidak, keterampilan praktis, empati, kreativitas, dan ketelitian juga potensi penting',
          'Hanya nilai olahraga yang dihitung',
          'Potensi tidak bisa dilihat di sekolah'
        ],
        correctIndex: 1,
        explanation: 'Kecerdasan dan potensi manusia beragam, mencakup logika, bahasa, visual, gerak, sosial, dan ketelitian.'
      },
      {
        id: 'q5',
        question: 'Cara sederhana menemukan potensi diri di kelas VII adalah...',
        options: [
          'Mengamati tugas apa yang paling membuat kita antusias dan mendapat umpan balik positif',
          'Membandingkan diri terus-menerus hingga merasa minder',
          'Menolak setiap tugas kelompok baru',
          'Menghindari masukan dari guru'
        ],
        correctIndex: 0,
        explanation: 'Umpan balik guru, orang tua, dan pengalaman mencoba berbagai tugas memberi petunjuk jelas tentang kekuatan kita.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-03',
    materialId: 'mat-vii-03',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa perbedaan utama antara minat dan bakat?',
        options: [
          'Minat adalah rasa ketertarikan, sedangkan bakat adalah kemampuan alami yang lebih mudah dikuasai',
          'Minat hanya untuk orang dewasa, bakat hanya untuk anak kecil',
          'Keduanya selalu sama persis tanpa perbedaan',
          'Bakat tidak perlu dilatih sama sekali'
        ],
        correctIndex: 0,
        explanation: 'Minat berkaitan dengan rasa suka dan dorongan hati, sedangkan bakat adalah kecakapan alami yang perlu diasah.'
      },
      {
        id: 'q2',
        question: 'Apa yang terjadi jika seseorang memiliki bakat menggambar tetapi tidak pernah berlatih?',
        options: [
          'Kemampuannya tetap otomatis menjadi juara dunia',
          'Bakat tersebut tidak berkembang maksimal dan bisa tumpul',
          'Bakat langsung berubah menjadi nilai matematika',
          'Tidak berpengaruh sama sekali'
        ],
        correctIndex: 1,
        explanation: 'Bakat membutuhkan latihan, umpan balik, dan ketekunan agar berkembang menjadi keahlian.'
      },
      {
        id: 'q3',
        question: 'Siswa yang sangat tertarik mempelajari coding meski awalnya masih kesulitan disebut memiliki...',
        options: [
          'Minat yang tinggi untuk belajar dan berkembang',
          'Ketidakmampuan total dalam teknologi',
          'Bakat yang tidak perlu usaha',
          'Keinginan menyerah'
        ],
        correctIndex: 0,
        explanation: 'Rasa tertarik yang kuat (minat) menjadi bahan bakar penting untuk terus berlatih hingga mahir.'
      },
      {
        id: 'q4',
        question: 'Cara efektif menguji apakah suatu hobi merupakan minat jangka panjang adalah...',
        options: [
          'Mengikuti kegiatannya secara konsisten di ekstrakurikuler atau proyek sekolah',
          'Membeli semua peralatan mahal lalu tidak pernah dipakai',
          'Ikut-ikutan teman selama satu hari saja',
          'Menunggu orang lain menentukan pilihan'
        ],
        correctIndex: 0,
        explanation: 'Keterlibatan konsisten membantu membedakan ketertarikan sesaat dari minat yang sungguh-sungguh.'
      },
      {
        id: 'q5',
        question: 'Pernyataan manakah yang paling tepat tentang minat dan bakat?',
        options: [
          'Minat hanya boleh satu jenis saja',
          'Siswa dapat memiliki beberapa minat sekaligus dan mengasahnya secara bertahap',
          'Jika tidak punya bakat seni, seseorang tidak bisa belajar desain',
          'Bakat hanya diwariskan untuk profesi tertentu'
        ],
        correctIndex: 1,
        explanation: 'Usia SMP adalah masa eksplorasi; memiliki lebih dari satu minat adalah hal yang wajar dan positif.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-04',
    materialId: 'mat-vii-04',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Mengapa kita perlu mengenali kekurangan diri selain kelebihan?',
        options: [
          'Agar merasa rendah diri di hadapan teman',
          'Agar tahu bagian mana yang perlu dilatih atau disiasati dengan strategi belajar yang tepat',
          'Supaya tidak berani mencoba hal baru',
          'Untuk menyalahkan orang lain'
        ],
        correctIndex: 1,
        explanation: 'Kesadaran akan kekurangan membantu kita menyusun rencana perbaikan yang realistis.'
      },
      {
        id: 'q2',
        question: 'Jika seorang siswa pandai menggambar tetapi sering gugup saat presentasi, langkah bijak yang bisa dilakukan adalah...',
        options: [
          'Berhenti menggambar selamanya',
          'Berlatih presentasi singkat di depan sahabat atau cermin sambil tetap mengasah gambar',
          'Menolak semua tugas presentasi sampai lulus',
          'Meminta orang lain mengerjakan seluruh tugasnya'
        ],
        correctIndex: 1,
        explanation: 'Kekuatan tetap dipertahankan sambil melatih area yang masih perlu penguatan secara bertahap.'
      },
      {
        id: 'q3',
        question: 'Sikap yang tepat ketika memiliki suatu kelebihan menonjol adalah...',
        options: [
          'Sombong dan meremehkan teman yang belum bisa',
          'Bersyukur, rendah hati, dan mau berbagi ilmu dengan teman',
          'Berhenti belajar karena merasa sudah paling pintar',
          'Menyembunyikan kemampuan dari guru'
        ],
        correctIndex: 1,
        explanation: 'Kelebihan semakin bermakna bila disertai kerendahan hati dan semangat kolaborasi.'
      },
      {
        id: 'q4',
        question: 'Kebiasaan menunda PR hingga larut malam dapat diatasi dengan cara...',
        options: [
          'Menunggu rasa malas hilang sendiri',
          'Membagi tugas menjadi bagian kecil 20-25 menit setiap sore',
          'Menyalakan televisi sambil mengerjakan PR',
          'Menyalin pekerjaan teman di pagi hari'
        ],
        correctIndex: 1,
        explanation: 'Teknik memecah tugas menjadi blok waktu singkat mengurangi rasa berat dan membangun disiplin.'
      },
      {
        id: 'q5',
        question: 'Bagaimana cara sehat menerima kritik atau saran dari guru BK?',
        options: [
          'Mendengarkan dengan terbuka sebagai bahan evaluasi untuk berkembang',
          'Langsung marah dan menutup diri',
          'Mengabaikan saran karena merasa sudah sempurna',
          'Menyalahkan keadaan kelas'
        ],
        correctIndex: 0,
        explanation: 'Umpan balik yang membangun membantu kita melihat titik buta yang perlu diperbaiki.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-05',
    materialId: 'mat-vii-05',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apa fungsi nilai-nilai kehidupan dalam perencanaan karier?',
        options: [
          'Menjadi kompas moral dalam mengambil keputusan belajar dan bekerja',
          'Hanya sebagai hafalan pelajaran PPKn',
          'Menghambat kreativitas siswa',
          'Menggantikan kebutuhan belajar keterampilan teknis'
        ],
        correctIndex: 0,
        explanation: 'Nilai kehidupan membimbing cara kita bekerja secara etis, bertanggung jawab, dan bermanfaat.'
      },
      {
        id: 'q2',
        question: 'Tindakan manakah yang menunjukkan nilai kejujuran di sekolah?',
        options: [
          'Mengakui hasil kerja sendiri saat ulangan tanpa menyontek',
          'Mengaku ikut kerja kelompok padahal tidak berkontribusi',
          'Mengubah nilai di lembar tugas sebelum ditunjukkan ke orang tua',
          'Menyalin jawaban dari internet tanpa membaca'
        ],
        correctIndex: 0,
        explanation: 'Kejujuran adalah fondasi kepercayaan baik di lingkungan sekolah maupun dunia kerja kelak.'
      },
      {
        id: 'q3',
        question: 'Seorang dokter yang sabar menjelaskan kondisi pasien menunjukkan nilai...',
        options: [
          'Kepedulian dan empati',
          'Keegoisan',
          'Ketidaksabaran',
          'Persaingan tidak sehat'
        ],
        correctIndex: 0,
        explanation: 'Profesi layanan dan kesehatan menuntut kepedulian serta empati tinggi terhadap sesama.'
      },
      {
        id: 'q4',
        question: 'Mengembalikan barang pinjaman teman dalam kondisi baik mencerminkan nilai...',
        options: [
          'Tanggung jawab dan dapat dipercaya',
          'Ketergantungan',
          'Kemalasan',
          'Ketidakpedulian'
        ],
        correctIndex: 0,
        explanation: 'Kebiasaan menjaga amanah kecil di SMP melatih integritas saat dewasa nanti.'
      },
      {
        id: 'q5',
        question: 'Mengapa kerja sama tim sangat dihargai di hampir semua profesi?',
        options: [
          'Karena pekerjaan besar lebih berhasil jika diselesaikan dengan saling menghargai peran masing-masing',
          'Agar satu orang bisa melempar semua tugas ke orang lain',
          'Supaya tidak perlu punya keahlian pribadi',
          'Karena dilarang berpikir mandiri'
        ],
        correctIndex: 0,
        explanation: 'Kolaborasi menggabungkan beragam keahlian untuk mencapai tujuan bersama dengan lebih baik.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-06',
    materialId: 'mat-vii-06',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Apakah wajar jika cita-cita siswa SMP berubah setelah mengenal hal baru?',
        options: [
          'Sangat wajar, karena wawasan tentang diri dan dunia kerja terus berkembang',
          'Tidak wajar dan harus dilarang',
          'Berarti siswa tidak punya pendirian sama sekali',
          'Harus langsung dihukum oleh wali kelas'
        ],
        correctIndex: 0,
        explanation: 'Perubahan cita-cita di masa remaja adalah proses sehat ketika siswa menemukan minat yang lebih tepat.'
      },
      {
        id: 'q2',
        question: 'Apa langkah awal terbaik untuk mendekati cita-cita di kelas VII?',
        options: [
          'Membiasakan disiplin belajar, rajin membaca, dan aktif mencoba kegiatan positif',
          'Menunggu hingga kelas IX tanpa melakukan apa-apa',
          'Hanya bermimpi tanpa usaha nyata',
          'Menghindari pelajaran yang terasa sulit'
        ],
        correctIndex: 0,
        explanation: 'Kebiasaan kecil setiap hari membangun fondasi pengetahuan dan karakter menuju cita-cita.'
      },
      {
        id: 'q3',
        question: 'Mengapa cita-cita sebaiknya dihubungkan dengan manfaat bagi orang lain?',
        options: [
          'Agar pekerjaan kita kelak terasa lebih bermakna dan memberi kontribusi nyata',
          'Supaya tidak mendapat upah',
          'Agar tidak perlu bersekolah lagi',
          'Hanya untuk pamer di media sosial'
        ],
        correctIndex: 0,
        explanation: 'Mengetahui manfaat profesi bagi masyarakat menumbuhkan motivasi belajar yang tulus dan tahan lama.'
      },
      {
        id: 'q4',
        question: 'Jika kamu belum yakin punya satu cita-cita spesifik, apa yang sebaiknya kamu lakukan?',
        options: [
          'Mengeksplorasi beberapa bidang yang diminati sambil berkonsultasi dengan Guru BK',
          'Menyerah dan tidak peduli dengan sekolah',
          'Meniru cita-cita teman terdekat secara paksa',
          'Berhenti ikut kegiatan sekolah'
        ],
        correctIndex: 0,
        explanation: 'Belum memiliki satu cita-cita pasti di kelas VII sangat normal; eksplorasi adalah jawabannya.'
      },
      {
        id: 'q5',
        question: 'Contoh target bulanan sederhana yang mendukung cita-cita adalah...',
        options: [
          'Menyelesaikan 1 buku bacaan baru atau melatih 1 keterampilan komunikasi setiap bulan',
          'Bermain gim 8 jam setiap hari',
          'Menunda semua tugas sampai akhir semester',
          'Menghapus semua jadwal belajar'
        ],
        correctIndex: 0,
        explanation: 'Target kecil yang terukur menjaga semangat dan konsistensi langkah menuju masa depan.'
      }
    ]
  },
  {
    id: 'quiz-mat-vii-07',
    materialId: 'mat-vii-07',
    published: true,
    questions: [
      {
        id: 'q1',
        question: 'Manakah pernyataan yang benar mengenai profesi di masyarakat?',
        options: [
          'Hanya ada 4 profesi yang penting di dunia',
          'Ada ratusan profesi yang saling terhubung dan sama-sama dibutuhkan masyarakat',
          'Profesi seni tidak bermanfaat bagi kehidupan',
          'Profesi teknologi hanya cocok untuk orang tertentu'
        ],
        correctIndex: 1,
        explanation: 'Kehidupan modern berjalan berkat kolaborasi ratusan profesi di berbagai bidang.'
      },
      {
        id: 'q2',
        question: 'Dalam pembuatan sebuah aplikasi belajar, profesi apa saja yang biasanya bekerja sama?',
        options: [
          'Pemrogram, desainer antarmuka, ahli materi pendidikan, dan penguji kualitas',
          'Hanya satu orang tanpa tim ahli pendidikan',
          'Hanya petugas kebersihan',
          'Hanya pengemudi logistik'
        ],
        correctIndex: 0,
        explanation: 'Produk digital pendidikan melibatkan kolaborasi ahli teknologi, desain, dan pendidik.'
      },
      {
        id: 'q3',
        question: 'Profesi yang bertugas merancang menu makanan sehat dan seimbang di rumah sakit atau sekolah adalah...',
        options: [
          'Ahli gizi (Nutrisionis)',
          'Teknisi jaringan komputer',
          'Arsitek bangunan',
          'Animator film'
        ],
        correctIndex: 0,
        explanation: 'Ahli gizi memadukan ilmu kesehatan dan pangan untuk memastikan asupan nutrisi yang tepat.'
      },
      {
        id: 'q4',
        question: 'Mengapa penting mengenal banyak jenis profesi sejak SMP?',
        options: [
          'Agar memiliki banyak alternatif pilihan sesuai minat dan tidak terpaku pada beberapa nama profesi saja',
          'Supaya bisa langsung membuka praktik dokter saat SMP',
          'Agar bingung memilih sekolah',
          'Untuk membandingkan penghasilan teman'
        ],
        correctIndex: 0,
        explanation: 'Wawasan profesi yang luas membuka peluang baru yang mungkin sangat cocok dengan potensi kita.'
      },
      {
        id: 'q5',
        question: 'Syarat agar setiap profesi bernilai mulia dan membanggakan adalah...',
        options: [
          'Dijalankan dengan jujur, profesional, dan memberi manfaat bagi sesama',
          'Harus selalu bekerja di gedung bertingkat tinggi',
          'Harus mengenakan jas setiap hari',
          'Tidak pernah melibatkan orang lain'
        ],
        correctIndex: 0,
        explanation: 'Nilai kemuliaan sebuah profesi terletak pada integritas, dedikasi, dan manfaatnya.'
      }
    ]
  }
];
