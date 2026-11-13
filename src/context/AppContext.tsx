import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  Announcement,
  CareerExploration,
  CareerMaterial,
  ChatbotUsageStat,
  ChatMessage,
  ChatSession,
  CounselingReferral,
  GradeLevel,
  InfoArticle,
  MaterialCategory,
  MaterialQuiz,
  NavTab,
  QuizResult,
  RiasecCode,
  RiasecScores,
  SiteSetting,
  StaffRole,
  UserProfile,
  UserRole,
} from '../types/bicara';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_MATERIALS,
  INITIAL_QUIZZES,
  INITIAL_SITE_SETTING,
} from '../data/seedData';

const BOOTSTRAPPED_ADMIN_EMAIL = 'abi.bbpmp2026@gmail.com';
const LOCAL_STORAGE_KEY = 'bicara_bk_demo_state_v1';

interface DemoLocalState {
  sessionEntered: boolean;
  profile: UserProfile;
  quizResults: QuizResult[];
  explorations: CareerExploration[];
  chatSessions: ChatSession[];
  chatMessages: ChatMessage[];
  referrals: CounselingReferral[];
}

const DEFAULT_DEMO_PROFILE: UserProfile = {
  uid: 'demo-siswa-smp',
  name: 'Rafi Pratama',
  email: 'rafi.siswa@smpn.sch.id',
  grade: 'VIII',
  school: 'SMPN Wonogiri',
  role: 'siswa',
  guardianConsent: true,
  completedMaterialIds: ['mat-vii-01', 'mat-viii-01'],
};

const DEFAULT_DEMO_STATE: DemoLocalState = {
  sessionEntered: false,
  profile: DEFAULT_DEMO_PROFILE,
  quizResults: [
    {
      id: 'demo-qr-1',
      userId: 'demo-siswa-smp',
      materialId: 'mat-vii-01',
      materialTitle: 'Apa Itu Bimbingan Karier?',
      grade: 'VII',
      score: 100,
      totalQuestions: 5,
      reflectionNote: 'Saya ingin mulai mengenal minat saya di bidang teknologi dan desain sejak sekarang.',
      completed: true,
    },
    {
      id: 'demo-qr-2',
      userId: 'demo-siswa-smp',
      materialId: 'mat-viii-01',
      materialTitle: 'Mengenal Dunia Kerja',
      grade: 'VIII',
      score: 80,
      totalQuestions: 5,
      reflectionNote: 'Disiplin mengumpulkan tugas tepat waktu ternyata sangat melatih etos kerja.',
      completed: true,
    },
  ],
  explorations: [],
  chatSessions: [],
  chatMessages: [],
  referrals: [],
};

function loadDemoState(): DemoLocalState {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_DEMO_STATE;
    const parsed = JSON.parse(raw) as Partial<DemoLocalState>;
    const mergedProfile = parsed.profile
      ? {
          ...DEFAULT_DEMO_PROFILE,
          ...parsed.profile,
          school:
            parsed.profile.school === 'SMP Negeri Harapan Nusantara'
              ? 'SMPN Wonogiri'
              : parsed.profile.school,
        }
      : DEFAULT_DEMO_PROFILE;
    return {
      sessionEntered: Boolean(parsed.sessionEntered),
      profile: mergedProfile,
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : DEFAULT_DEMO_STATE.quizResults,
      explorations: Array.isArray(parsed.explorations) ? parsed.explorations : [],
      chatSessions: Array.isArray(parsed.chatSessions) ? parsed.chatSessions : [],
      chatMessages: Array.isArray(parsed.chatMessages) ? parsed.chatMessages : [],
      referrals: Array.isArray(parsed.referrals) ? parsed.referrals : [],
    };
  } catch {
    return DEFAULT_DEMO_STATE;
  }
}

export interface AppContextValue {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedMaterialId: string | null;
  setSelectedMaterialId: (id: string | null) => void;
  firebaseUser: FirebaseUser | null;
  authReady: boolean;
  hasEnteredSession: boolean;
  isDemoMode: boolean;
  demoAdminPreview: boolean;
  setDemoAdminPreview: (val: boolean) => void;
  profile: UserProfile;
  effectiveRole: UserRole;
  loginWithStudentName: (payload: { name: string; grade: GradeLevel; guardianConsent: boolean }) => void;
  enterGuruBkPreview: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;

  // Content & User Data
  categories: MaterialCategory[];
  materials: CareerMaterial[];
  quizzes: MaterialQuiz[];
  articles: InfoArticle[];
  announcements: Announcement[];
  siteSetting: SiteSetting;
  quizResults: QuizResult[];
  explorations: CareerExploration[];
  chatSessions: ChatSession[];
  chatMessages: ChatMessage[];
  referrals: CounselingReferral[];

  // Admin / Staff Datasets
  allUsers: UserProfile[];
  allExplorations: CareerExploration[];
  allQuizResults: QuizResult[];
  chatbotStats: ChatbotUsageStat[];
  staffRoles: StaffRole[];

  // Mutations
  updateProfile: (updates: Partial<Pick<UserProfile, 'name' | 'grade' | 'school' | 'photoUrl' | 'guardianConsent'>>) => Promise<void>;
  saveQuizCompletion: (payload: {
    material: CareerMaterial;
    score: number;
    totalQuestions: number;
    reflectionNote: string;
    markCompleted: boolean;
  }) => Promise<void>;
  saveRiasecResult: (scores: RiasecScores, topThree: RiasecCode[], answersCount: number) => Promise<CareerExploration>;
  createChatSession: (title: string, topicCategory: string) => Promise<ChatSession>;
  appendChatMessage: (sessionId: string, role: 'user' | 'model', content: string, topicCategory?: string) => Promise<void>;
  deleteChatSession: (sessionId: string) => Promise<void>;
  submitCounselingReferral: (topic: string, studentSummary: string) => Promise<void>;

  // Admin / Guru BK CRUD
  saveMaterial: (material: Omit<CareerMaterial, 'authorId' | 'createdAt' | 'updatedAt'>, quiz?: MaterialQuiz) => Promise<void>;
  deleteMaterial: (materialId: string) => Promise<void>;
  saveCategory: (category: Omit<MaterialCategory, 'updatedAt'>) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  saveArticle: (article: Omit<InfoArticle, 'authorId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteArticle: (articleId: string) => Promise<void>;
  saveAnnouncement: (announcement: Omit<Announcement, 'authorId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteAnnouncement: (announcementId: string) => Promise<void>;
  saveSiteSetting: (setting: Omit<SiteSetting, 'id' | 'updatedAt'>) => Promise<void>;
  updateReferralStatus: (referralId: string, status: CounselingReferral['status'], counselorNote: string) => Promise<void>;
  updateStudentAccount: (uid: string, grade: GradeLevel | 'Staff', role: UserRole) => Promise<void>;
  assignStaffRole: (uid: string, email: string, name: string, role: 'guru_bk' | 'admin') => Promise<void>;
  removeStaffRole: (uid: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [demoAdminPreview, setDemoAdminPreview] = useState(false);

  const [demoState, setDemoState] = useState<DemoLocalState>(() => loadDemoState());
  const [liveProfile, setLiveProfile] = useState<UserProfile | null>(null);
  const [staffRoleDoc, setStaffRoleDoc] = useState<StaffRole | null>(null);

  const [categories, setCategories] = useState<MaterialCategory[]>(INITIAL_CATEGORIES);
  const [materials, setMaterials] = useState<CareerMaterial[]>(INITIAL_MATERIALS);
  const [quizzes, setQuizzes] = useState<MaterialQuiz[]>(INITIAL_QUIZZES);
  const [articles, setArticles] = useState<InfoArticle[]>(INITIAL_ARTICLES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [siteSetting, setSiteSetting] = useState<SiteSetting>(INITIAL_SITE_SETTING);

  const [liveQuizResults, setLiveQuizResults] = useState<QuizResult[]>([]);
  const [liveExplorations, setLiveExplorations] = useState<CareerExploration[]>([]);
  const [liveChatSessions, setLiveChatSessions] = useState<ChatSession[]>([]);
  const [liveChatMessages, setLiveChatMessages] = useState<ChatMessage[]>([]);
  const [liveReferrals, setLiveReferrals] = useState<CounselingReferral[]>([]);

  // Admin collections
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [allExplorations, setAllExplorations] = useState<CareerExploration[]>([]);
  const [allQuizResults, setAllQuizResults] = useState<QuizResult[]>([]);
  const [chatbotStats, setChatbotStats] = useState<ChatbotUsageStat[]>([]);
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoState));
    } catch {
      // Ignore storage quota errors
    }
  }, [demoState]);

  const isDemoMode = !firebaseUser;

  const effectiveRole: UserRole = useMemo(() => {
    if (!firebaseUser) {
      return demoAdminPreview ? 'guru_bk' : 'siswa';
    }
    if (firebaseUser.email === BOOTSTRAPPED_ADMIN_EMAIL && firebaseUser.emailVerified) {
      return 'admin';
    }
    if (staffRoleDoc) {
      return staffRoleDoc.role;
    }
    return liveProfile?.role || 'siswa';
  }, [firebaseUser, demoAdminPreview, staffRoleDoc, liveProfile]);

  const profile: UserProfile = useMemo(() => {
    if (!firebaseUser) {
      return {
        ...demoState.profile,
        role: demoAdminPreview ? 'guru_bk' : 'siswa',
      };
    }
    if (liveProfile) {
      return {
        ...liveProfile,
        role: effectiveRole,
      };
    }
    return {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || 'Pengguna BICARA BK',
      email: firebaseUser.email || '',
      grade: effectiveRole === 'siswa' ? 'VIII' : 'Staff',
      school: 'SMPN Wonogiri',
      role: effectiveRole,
      photoUrl: firebaseUser.photoURL || undefined,
      guardianConsent: true,
      completedMaterialIds: [],
    };
  }, [firebaseUser, demoState.profile, demoAdminPreview, liveProfile, effectiveRole]);

  // Seed Firestore public curriculum once if admin signs in and collections are empty
  const seedInitialFirestoreData = useCallback(async (authorId: string) => {
    try {
      const existingMats = await getDocs(collection(db, 'materials'));
      if (!existingMats.empty) return;

      const batch = writeBatch(db);
      for (const cat of INITIAL_CATEGORIES) {
        batch.set(doc(db, 'material_categories', cat.id), {
          ...cat,
          updatedAt: serverTimestamp(),
        });
      }
      for (const mat of INITIAL_MATERIALS) {
        batch.set(doc(db, 'materials', mat.id), {
          ...mat,
          authorId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      for (const quiz of INITIAL_QUIZZES) {
        batch.set(doc(db, 'quizzes', quiz.id), {
          ...quiz,
          updatedAt: serverTimestamp(),
        });
      }
      for (const art of INITIAL_ARTICLES) {
        batch.set(doc(db, 'articles', art.id), {
          ...art,
          authorId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      for (const ann of INITIAL_ANNOUNCEMENTS) {
        batch.set(doc(db, 'announcements', ann.id), {
          ...ann,
          authorId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      batch.set(doc(db, 'site_settings', 'home'), {
        ...INITIAL_SITE_SETTING,
        updatedAt: serverTimestamp(),
      });
      await batch.commit();
    } catch (err) {
      console.warn('Initial seeding skipped or failed:', err);
    }
  }, []);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setAuthReady(true);

      if (!user) {
        setLiveProfile(null);
        setStaffRoleDoc(null);
        return;
      }

      try {
        // Check staff role doc
        const staffSnap = await getDoc(doc(db, 'staff_roles', user.uid));
        const staffData = staffSnap.exists() ? (staffSnap.data() as StaffRole) : null;
        setStaffRoleDoc(staffData);

        const isBootAdmin = user.email === BOOTSTRAPPED_ADMIN_EMAIL && user.emailVerified;
        const computedRole: UserRole = isBootAdmin ? 'admin' : staffData?.role || 'siswa';

        // Ensure user profile doc exists
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          const initialUser: Record<string, unknown> = {
            uid: user.uid,
            name: (user.displayName || 'Siswa SMP').slice(0, 120),
            email: (user.email || '').slice(0, 160),
            grade: computedRole === 'siswa' ? 'VIII' : 'Staff',
            school: 'SMPN Wonogiri',
            role: isBootAdmin ? 'admin' : 'siswa',
            guardianConsent: true,
            completedMaterialIds: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          if (user.photoURL) {
            initialUser.photoUrl = user.photoURL.slice(0, 500);
          }
          await setDoc(userRef, initialUser);
        } else if (userSnap.data()?.school === 'SMP Negeri Harapan Nusantara') {
          await updateDoc(userRef, {
            school: 'SMPN Wonogiri',
            updatedAt: serverTimestamp(),
          });
        }

        if (computedRole === 'admin' || computedRole === 'guru_bk') {
          void seedInitialFirestoreData(user.uid);
        }
      } catch (err) {
        console.error('Auth initialization profile sync warning:', err);
      }
    });
    return () => unsub();
  }, [seedInitialFirestoreData]);

  // Public / Published listeners (safe queries matching rules)
  useEffect(() => {
    const isStaff = effectiveRole === 'admin' || effectiveRole === 'guru_bk';

    const unsubCats = onSnapshot(
      collection(db, 'material_categories'),
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => d.data() as MaterialCategory).sort((a, b) => a.order - b.order);
          setCategories(items);
        }
      },
      (err) => {
        console.warn('Categories listener fallback to local seed:', err.message);
      }
    );

    const matQuery = isStaff && firebaseUser
      ? collection(db, 'materials')
      : query(collection(db, 'materials'), where('published', '==', true));

    const unsubMats = onSnapshot(
      matQuery,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => d.data() as CareerMaterial).sort((a, b) => a.id.localeCompare(b.id));
          setMaterials(items);
        }
      },
      (err) => {
        console.warn('Materials listener fallback to local seed:', err.message);
      }
    );

    const quizQuery = isStaff && firebaseUser
      ? collection(db, 'quizzes')
      : query(collection(db, 'quizzes'), where('published', '==', true));

    const unsubQuizzes = onSnapshot(
      quizQuery,
      (snap) => {
        if (!snap.empty) {
          setQuizzes(snap.docs.map((d) => d.data() as MaterialQuiz));
        }
      },
      (err) => {
        console.warn('Quizzes listener fallback to local seed:', err.message);
      }
    );

    const artQuery = isStaff && firebaseUser
      ? collection(db, 'articles')
      : query(collection(db, 'articles'), where('published', '==', true));

    const unsubArts = onSnapshot(
      artQuery,
      (snap) => {
        if (!snap.empty) {
          setArticles(snap.docs.map((d) => d.data() as InfoArticle));
        }
      },
      (err) => {
        console.warn('Articles listener fallback to local seed:', err.message);
      }
    );

    const annQuery = isStaff && firebaseUser
      ? collection(db, 'announcements')
      : query(collection(db, 'announcements'), where('active', '==', true));

    const unsubAnns = onSnapshot(
      annQuery,
      (snap) => {
        if (!snap.empty) {
          setAnnouncements(snap.docs.map((d) => d.data() as Announcement));
        }
      },
      (err) => {
        console.warn('Announcements listener fallback to local seed:', err.message);
      }
    );

    const unsubHome = onSnapshot(
      doc(db, 'site_settings', 'home'),
      (snap) => {
        if (snap.exists()) {
          setSiteSetting(snap.data() as SiteSetting);
        }
      },
      (err) => {
        console.warn('Site settings fallback to local seed:', err.message);
      }
    );

    return () => {
      unsubCats();
      unsubMats();
      unsubQuizzes();
      unsubArts();
      unsubAnns();
      unsubHome();
    };
  }, [effectiveRole, firebaseUser]);

  // Authenticated user personal listeners
  useEffect(() => {
    if (!authReady || !firebaseUser) return;

    const uid = firebaseUser.uid;
    const unsubUser = onSnapshot(
      doc(db, 'users', uid),
      (snap) => {
        if (snap.exists()) {
          setLiveProfile(snap.data() as UserProfile);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, `users/${uid}`)
    );

    const unsubQR = onSnapshot(
      query(collection(db, 'quiz_results'), where('userId', '==', uid)),
      (snap) => {
        setLiveQuizResults(snap.docs.map((d) => d.data() as QuizResult));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'quiz_results')
    );

    const unsubExp = onSnapshot(
      query(collection(db, 'career_explorations'), where('userId', '==', uid)),
      (snap) => {
        setLiveExplorations(snap.docs.map((d) => d.data() as CareerExploration));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'career_explorations')
    );

    const unsubSessions = onSnapshot(
      query(collection(db, 'chat_sessions'), where('userId', '==', uid)),
      (snap) => {
        setLiveChatSessions(snap.docs.map((d) => d.data() as ChatSession));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'chat_sessions')
    );

    const unsubMessages = onSnapshot(
      query(collection(db, 'chat_messages'), where('userId', '==', uid)),
      (snap) => {
        setLiveChatMessages(snap.docs.map((d) => d.data() as ChatMessage));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'chat_messages')
    );

    const refQuery =
      effectiveRole === 'admin' || effectiveRole === 'guru_bk'
        ? collection(db, 'counseling_referrals')
        : query(collection(db, 'counseling_referrals'), where('userId', '==', uid));

    const unsubRefs = onSnapshot(
      refQuery,
      (snap) => {
        setLiveReferrals(snap.docs.map((d) => d.data() as CounselingReferral));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'counseling_referrals')
    );

    return () => {
      unsubUser();
      unsubQR();
      unsubExp();
      unsubSessions();
      unsubMessages();
      unsubRefs();
    };
  }, [authReady, firebaseUser, effectiveRole]);

  // Admin / Guru BK analytics listeners
  useEffect(() => {
    if (!authReady || !firebaseUser) {
      setAllUsers([]);
      setAllExplorations([]);
      setAllQuizResults([]);
      setChatbotStats([]);
      setStaffRoles([]);
      return;
    }
    if (effectiveRole !== 'admin' && effectiveRole !== 'guru_bk') return;

    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snap) => setAllUsers(snap.docs.map((d) => d.data() as UserProfile)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'users')
    );
    const unsubAllExp = onSnapshot(
      collection(db, 'career_explorations'),
      (snap) => setAllExplorations(snap.docs.map((d) => d.data() as CareerExploration)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'career_explorations')
    );
    const unsubAllQR = onSnapshot(
      collection(db, 'quiz_results'),
      (snap) => setAllQuizResults(snap.docs.map((d) => d.data() as QuizResult)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'quiz_results')
    );
    const unsubStats = onSnapshot(
      collection(db, 'chatbot_usage_stats'),
      (snap) => setChatbotStats(snap.docs.map((d) => d.data() as ChatbotUsageStat)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'chatbot_usage_stats')
    );

    let unsubStaff = () => {};
    if (effectiveRole === 'admin') {
      unsubStaff = onSnapshot(
        collection(db, 'staff_roles'),
        (snap) => setStaffRoles(snap.docs.map((d) => d.data() as StaffRole)),
        (err) => handleFirestoreError(err, OperationType.LIST, 'staff_roles')
      );
    }

    return () => {
      unsubUsers();
      unsubAllExp();
      unsubAllQR();
      unsubStats();
      unsubStaff();
    };
  }, [authReady, firebaseUser, effectiveRole]);

  const loginWithStudentName = useCallback(
    (payload: { name: string; grade: GradeLevel; guardianConsent: boolean }) => {
      const cleanName = payload.name.trim().slice(0, 120);
      setDemoAdminPreview(false);
      setActiveTab('beranda');
      setDemoState((prev) => {
        const isSameStudent =
          prev.profile.name.trim().toLowerCase() === cleanName.toLowerCase() &&
          prev.profile.name !== DEFAULT_DEMO_PROFILE.name;
        const baseProfile: UserProfile = {
          uid: prev.profile.uid,
          name: cleanName,
          email: `${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@siswa.smpnwonogiri.sch.id`,
          grade: payload.grade,
          school: 'SMPN Wonogiri',
          role: 'siswa',
          guardianConsent: payload.guardianConsent,
          completedMaterialIds: isSameStudent ? prev.profile.completedMaterialIds : [],
        };
        return {
          sessionEntered: true,
          profile: baseProfile,
          quizResults: isSameStudent ? prev.quizResults : [],
          explorations: isSameStudent ? prev.explorations : [],
          chatSessions: isSameStudent ? prev.chatSessions : [],
          chatMessages: isSameStudent ? prev.chatMessages : [],
          referrals: isSameStudent ? prev.referrals : [],
        };
      });
    },
    []
  );

  const enterGuruBkPreview = useCallback(() => {
    setDemoState((prev) => ({
      ...prev,
      sessionEntered: true,
    }));
    setDemoAdminPreview(true);
    setActiveTab('admin');
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setDemoAdminPreview(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setAuthError(
        msg.includes('popup-closed')
          ? 'Jendela login Google ditutup sebelum selesai.'
          : 'Gagal masuk dengan Google. Pastikan pop-up browser diizinkan.'
      );
    }
  }, []);

  const signOut = useCallback(async () => {
    if (firebaseUser) {
      await firebaseSignOut(auth);
    }
    setDemoAdminPreview(false);
    setDemoState((prev) => ({
      ...prev,
      sessionEntered: false,
    }));
    setActiveTab('beranda');
  }, [firebaseUser]);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const updateProfile = useCallback(
    async (updates: Partial<Pick<UserProfile, 'name' | 'grade' | 'school' | 'photoUrl' | 'guardianConsent'>>) => {
      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...updates,
          },
        }));
        return;
      }

      const path = `users/${firebaseUser.uid}`;
      try {
        const payload: Record<string, unknown> = {
          updatedAt: serverTimestamp(),
        };
        if (updates.name !== undefined) payload.name = updates.name.trim().slice(0, 120);
        if (updates.grade !== undefined) payload.grade = updates.grade;
        if (updates.school !== undefined) payload.school = updates.school.trim().slice(0, 160);
        if (updates.guardianConsent !== undefined) payload.guardianConsent = updates.guardianConsent;
        if (updates.photoUrl !== undefined && updates.photoUrl.trim()) {
          payload.photoUrl = updates.photoUrl.trim().slice(0, 500);
        }
        await updateDoc(doc(db, 'users', firebaseUser.uid), payload);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, path);
      }
    },
    [firebaseUser]
  );

  const saveQuizCompletion = useCallback(
    async ({
      material,
      score,
      totalQuestions,
      reflectionNote,
      markCompleted,
    }: {
      material: CareerMaterial;
      score: number;
      totalQuestions: number;
      reflectionNote: string;
      markCompleted: boolean;
    }) => {
      const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
      const cleanNote = reflectionNote.trim().slice(0, 2000);

      if (!firebaseUser) {
        setDemoState((prev) => {
          const existingIdx = prev.quizResults.findIndex((r) => r.materialId === material.id);
          const nextResult: QuizResult = {
            id: existingIdx >= 0 ? prev.quizResults[existingIdx].id : `demo-qr-${material.id}`,
            userId: prev.profile.uid,
            materialId: material.id,
            materialTitle: material.title,
            grade: material.grade,
            score: clampedScore,
            totalQuestions,
            reflectionNote: cleanNote,
            completed: markCompleted,
          };
          const nextResults = [...prev.quizResults];
          if (existingIdx >= 0) nextResults[existingIdx] = nextResult;
          else nextResults.push(nextResult);

          const nextCompleted = markCompleted
            ? Array.from(new Set([...prev.profile.completedMaterialIds, material.id]))
            : prev.profile.completedMaterialIds;

          return {
            ...prev,
            quizResults: nextResults,
            profile: { ...prev.profile, completedMaterialIds: nextCompleted },
          };
        });
        return;
      }

      const resultId = `${firebaseUser.uid}_${material.id}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
      const path = `quiz_results/${resultId}`;
      try {
        // Ensure material doc exists in Firestore before saving result (rules check exists(materials/$(materialId)))
        const matRef = doc(db, 'materials', material.id);
        const matSnap = await getDoc(matRef);

        const existingResultSnap = await getDoc(doc(db, 'quiz_results', resultId));
        if (matSnap.exists()) {
          if (existingResultSnap.exists()) {
            await updateDoc(doc(db, 'quiz_results', resultId), {
              score: clampedScore,
              totalQuestions,
              reflectionNote: cleanNote,
              completed: markCompleted,
              updatedAt: serverTimestamp(),
            });
          } else {
            await setDoc(doc(db, 'quiz_results', resultId), {
              id: resultId,
              userId: firebaseUser.uid,
              materialId: material.id,
              materialTitle: material.title.slice(0, 160),
              grade: material.grade,
              score: clampedScore,
              totalQuestions,
              reflectionNote: cleanNote,
              completed: markCompleted,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        }

        if (markCompleted) {
          const nextIds = Array.from(new Set([...(liveProfile?.completedMaterialIds || []), material.id])).slice(0, 100);
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            completedMaterialIds: nextIds,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    },
    [firebaseUser, liveProfile]
  );

  const saveRiasecResult = useCallback(
    async (scores: RiasecScores, topThree: RiasecCode[], answersCount: number): Promise<CareerExploration> => {
      const id = `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const entry: CareerExploration = {
        id,
        userId: profile.uid,
        userName: profile.name.slice(0, 120),
        grade: profile.grade,
        scores,
        topThree,
        answersCount,
        createdAtLabel: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };

      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          explorations: [entry, ...prev.explorations],
        }));
        return entry;
      }

      const path = `career_explorations/${id}`;
      try {
        await setDoc(doc(db, 'career_explorations', id), {
          id,
          userId: firebaseUser.uid,
          userName: profile.name.slice(0, 120),
          grade: profile.grade,
          scores,
          topThree,
          answersCount,
          createdAt: serverTimestamp(),
        });
        return entry;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    },
    [firebaseUser, profile]
  );

  const createChatSession = useCallback(
    async (title: string, topicCategory: string): Promise<ChatSession> => {
      const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const cleanTitle = title.trim().slice(0, 140) || 'Percakapan Baru';
      const cleanTopic = topicCategory.trim().slice(0, 60) || 'Konsultasi Umum';
      const session: ChatSession = {
        id,
        userId: profile.uid,
        title: cleanTitle,
        topicCategory: cleanTopic,
        messageCount: 0,
      };

      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          chatSessions: [session, ...prev.chatSessions],
        }));
        return session;
      }

      const path = `chat_sessions/${id}`;
      try {
        await setDoc(doc(db, 'chat_sessions', id), {
          ...session,
          userId: firebaseUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return session;
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    },
    [firebaseUser, profile.uid]
  );

  const appendChatMessage = useCallback(
    async (sessionId: string, role: 'user' | 'model', content: string, topicCategory = 'Konsultasi Umum') => {
      const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const cleanContent = content.slice(0, 10000);
      const message: ChatMessage = {
        id,
        sessionId,
        userId: profile.uid,
        role,
        content: cleanContent,
      };

      if (!firebaseUser) {
        setDemoState((prev) => {
          const nextMessages = [...prev.chatMessages, message];
          const nextSessions = prev.chatSessions.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  title: s.messageCount === 0 && role === 'user' ? cleanContent.slice(0, 56) : s.title,
                  topicCategory,
                  messageCount: s.messageCount + 1,
                }
              : s
          );
          return {
            ...prev,
            chatMessages: nextMessages,
            chatSessions: nextSessions,
          };
        });
        return;
      }

      const msgPath = `chat_messages/${id}`;
      try {
        await setDoc(doc(db, 'chat_messages', id), {
          id,
          sessionId,
          userId: firebaseUser.uid,
          role,
          content: cleanContent,
          createdAt: serverTimestamp(),
        });

        const sessSnap = await getDoc(doc(db, 'chat_sessions', sessionId));
        if (sessSnap.exists()) {
          const prevData = sessSnap.data() as ChatSession;
          await updateDoc(doc(db, 'chat_sessions', sessionId), {
            title: prevData.messageCount === 0 && role === 'user' ? cleanContent.slice(0, 56) : prevData.title,
            topicCategory: topicCategory.slice(0, 60),
            messageCount: Math.min(500, (prevData.messageCount || 0) + 1),
            updatedAt: serverTimestamp(),
          });
        }

        if (role === 'user') {
          const statId = `stat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
          await setDoc(doc(db, 'chatbot_usage_stats', statId), {
            id: statId,
            userId: firebaseUser.uid,
            grade: profile.grade,
            topicCategory: topicCategory.slice(0, 60),
            createdAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, msgPath);
      }
    },
    [firebaseUser, profile.grade, profile.uid]
  );

  const deleteChatSession = useCallback(
    async (sessionId: string) => {
      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          chatSessions: prev.chatSessions.filter((s) => s.id !== sessionId),
          chatMessages: prev.chatMessages.filter((m) => m.sessionId !== sessionId),
        }));
        return;
      }

      try {
        const msgSnap = await getDocs(
          query(collection(db, 'chat_messages'), where('userId', '==', firebaseUser.uid), where('sessionId', '==', sessionId))
        );
        const batch = writeBatch(db);
        msgSnap.docs.forEach((d) => batch.delete(d.ref));
        batch.delete(doc(db, 'chat_sessions', sessionId));
        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `chat_sessions/${sessionId}`);
      }
    },
    [firebaseUser]
  );

  const submitCounselingReferral = useCallback(
    async (topic: string, studentSummary: string) => {
      const id = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const referral: CounselingReferral = {
        id,
        userId: profile.uid,
        userName: profile.name.slice(0, 120),
        grade: profile.grade,
        topic: topic.trim().slice(0, 120),
        studentSummary: studentSummary.trim().slice(0, 2000),
        consentGiven: true,
        status: 'menunggu',
        counselorNote: '',
      };

      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          referrals: [referral, ...prev.referrals],
        }));
        return;
      }

      try {
        await setDoc(doc(db, 'counseling_referrals', id), {
          ...referral,
          userId: firebaseUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `counseling_referrals/${id}`);
      }
    },
    [firebaseUser, profile.grade, profile.name, profile.uid]
  );

  // Admin / Guru BK CRUD
  const saveMaterial = useCallback(
    async (material: Omit<CareerMaterial, 'authorId' | 'createdAt' | 'updatedAt'>, quiz?: MaterialQuiz) => {
      if (!firebaseUser) {
        const localMat: CareerMaterial = { ...material, authorId: profile.uid };
        setMaterials((prev) => {
          const idx = prev.findIndex((m) => m.id === material.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = localMat;
            return copy;
          }
          return [localMat, ...prev];
        });
        if (quiz) {
          setQuizzes((prev) => {
            const idx = prev.findIndex((q) => q.materialId === material.id);
            if (idx >= 0) {
              const copy = [...prev];
              copy[idx] = quiz;
              return copy;
            }
            return [quiz, ...prev];
          });
        }
        return;
      }

      try {
        const ref = doc(db, 'materials', material.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            title: material.title.slice(0, 160),
            grade: material.grade,
            categoryId: material.categoryId,
            categoryName: material.categoryName.slice(0, 100),
            learningObjective: material.learningObjective.slice(0, 500),
            imageUrl: material.imageUrl.slice(0, 500),
            explanation: material.explanation.slice(0, 8000),
            dailyExamples: material.dailyExamples.slice(0, 10),
            reflectionPrompt: material.reflectionPrompt.slice(0, 600),
            published: material.published,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            ...material,
            authorId: firebaseUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        if (quiz) {
          await setDoc(doc(db, 'quizzes', quiz.id), {
            ...quiz,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `materials/${material.id}`);
      }
    },
    [firebaseUser, profile.uid]
  );

  const deleteMaterial = useCallback(
    async (materialId: string) => {
      if (!firebaseUser) {
        setMaterials((prev) => prev.filter((m) => m.id !== materialId));
        return;
      }
      try {
        await deleteDoc(doc(db, 'materials', materialId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `materials/${materialId}`);
      }
    },
    [firebaseUser]
  );

  const saveCategory = useCallback(
    async (category: Omit<MaterialCategory, 'updatedAt'>) => {
      if (!firebaseUser) {
        setCategories((prev) => {
          const idx = prev.findIndex((c) => c.id === category.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = category;
            return copy;
          }
          return [...prev, category];
        });
        return;
      }
      try {
        await setDoc(doc(db, 'material_categories', category.id), {
          ...category,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `material_categories/${category.id}`);
      }
    },
    [firebaseUser]
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      if (!firebaseUser) {
        setCategories((prev) => prev.filter((c) => c.id !== categoryId));
        return;
      }
      try {
        await deleteDoc(doc(db, 'material_categories', categoryId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `material_categories/${categoryId}`);
      }
    },
    [firebaseUser]
  );

  const saveArticle = useCallback(
    async (article: Omit<InfoArticle, 'authorId' | 'createdAt' | 'updatedAt'>) => {
      if (!firebaseUser) {
        const localArt: InfoArticle = { ...article, authorId: profile.uid };
        setArticles((prev) => {
          const idx = prev.findIndex((a) => a.id === article.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = localArt;
            return copy;
          }
          return [localArt, ...prev];
        });
        return;
      }
      try {
        const ref = doc(db, 'articles', article.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            title: article.title.slice(0, 200),
            category: article.category.slice(0, 80),
            publishedDateLabel: article.publishedDateLabel.slice(0, 60),
            updatedAtLabel: article.updatedAtLabel.slice(0, 60),
            summary: article.summary.slice(0, 600),
            content: article.content.slice(0, 8000),
            sourceName: article.sourceName.slice(0, 160),
            sourceUrl: article.sourceUrl.slice(0, 500),
            imageUrl: article.imageUrl.slice(0, 500),
            published: article.published,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            ...article,
            authorId: firebaseUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `articles/${article.id}`);
      }
    },
    [firebaseUser, profile.uid]
  );

  const deleteArticle = useCallback(
    async (articleId: string) => {
      if (!firebaseUser) {
        setArticles((prev) => prev.filter((a) => a.id !== articleId));
        return;
      }
      try {
        await deleteDoc(doc(db, 'articles', articleId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `articles/${articleId}`);
      }
    },
    [firebaseUser]
  );

  const saveAnnouncement = useCallback(
    async (announcement: Omit<Announcement, 'authorId' | 'createdAt' | 'updatedAt'>) => {
      if (!firebaseUser) {
        const localAnn: Announcement = { ...announcement, authorId: profile.uid };
        setAnnouncements((prev) => {
          const idx = prev.findIndex((a) => a.id === announcement.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = localAnn;
            return copy;
          }
          return [localAnn, ...prev];
        });
        return;
      }
      try {
        const ref = doc(db, 'announcements', announcement.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            title: announcement.title.slice(0, 160),
            message: announcement.message.slice(0, 1000),
            targetGrade: announcement.targetGrade,
            active: announcement.active,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            ...announcement,
            authorId: firebaseUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `announcements/${announcement.id}`);
      }
    },
    [firebaseUser, profile.uid]
  );

  const deleteAnnouncement = useCallback(
    async (announcementId: string) => {
      if (!firebaseUser) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== announcementId));
        return;
      }
      try {
        await deleteDoc(doc(db, 'announcements', announcementId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `announcements/${announcementId}`);
      }
    },
    [firebaseUser]
  );

  const saveSiteSetting = useCallback(
    async (setting: Omit<SiteSetting, 'id' | 'updatedAt'>) => {
      const next: SiteSetting = { id: 'home', ...setting };
      if (!firebaseUser) {
        setSiteSetting(next);
        return;
      }
      try {
        await setDoc(doc(db, 'site_settings', 'home'), {
          ...next,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'site_settings/home');
      }
    },
    [firebaseUser]
  );

  const updateReferralStatus = useCallback(
    async (referralId: string, status: CounselingReferral['status'], counselorNote: string) => {
      if (!firebaseUser) {
        setDemoState((prev) => ({
          ...prev,
          referrals: prev.referrals.map((r) =>
            r.id === referralId ? { ...r, status, counselorNote } : r
          ),
        }));
        return;
      }
      try {
        await updateDoc(doc(db, 'counseling_referrals', referralId), {
          status,
          counselorNote: counselorNote.slice(0, 2000),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `counseling_referrals/${referralId}`);
      }
    },
    [firebaseUser]
  );

  const updateStudentAccount = useCallback(
    async (uid: string, grade: GradeLevel | 'Staff', role: UserRole) => {
      if (!firebaseUser) return;
      try {
        await updateDoc(doc(db, 'users', uid), {
          grade,
          role,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${uid}`);
      }
    },
    [firebaseUser]
  );

  const assignStaffRole = useCallback(
    async (uid: string, email: string, name: string, role: 'guru_bk' | 'admin') => {
      if (!firebaseUser) return;
      try {
        await setDoc(doc(db, 'staff_roles', uid), {
          uid,
          email: email.trim().slice(0, 160),
          name: name.trim().slice(0, 120),
          role,
          createdAt: serverTimestamp(),
        });
        const userSnap = await getDoc(doc(db, 'users', uid));
        if (userSnap.exists()) {
          await updateDoc(doc(db, 'users', uid), {
            role,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `staff_roles/${uid}`);
      }
    },
    [firebaseUser]
  );

  const removeStaffRole = useCallback(
    async (uid: string) => {
      if (!firebaseUser) return;
      try {
        await deleteDoc(doc(db, 'staff_roles', uid));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `staff_roles/${uid}`);
      }
    },
    [firebaseUser]
  );

  const quizResults = firebaseUser ? liveQuizResults : demoState.quizResults;
  const explorations = firebaseUser ? liveExplorations : demoState.explorations;
  const chatSessions = firebaseUser ? liveChatSessions : demoState.chatSessions;
  const chatMessages = firebaseUser ? liveChatMessages : demoState.chatMessages;
  const referrals = firebaseUser ? liveReferrals : demoState.referrals;

  const hasEnteredSession = Boolean(firebaseUser) || Boolean(demoState.sessionEntered);

  const value: AppContextValue = {
    activeTab,
    setActiveTab,
    selectedMaterialId,
    setSelectedMaterialId,
    firebaseUser,
    authReady,
    hasEnteredSession,
    isDemoMode,
    demoAdminPreview,
    setDemoAdminPreview,
    profile,
    effectiveRole,
    loginWithStudentName,
    enterGuruBkPreview,
    signInWithGoogle,
    signOut,
    authError,
    clearAuthError,
    categories,
    materials,
    quizzes,
    articles,
    announcements,
    siteSetting,
    quizResults,
    explorations,
    chatSessions,
    chatMessages,
    referrals,
    allUsers,
    allExplorations,
    allQuizResults,
    chatbotStats,
    staffRoles,
    updateProfile,
    saveQuizCompletion,
    saveRiasecResult,
    createChatSession,
    appendChatMessage,
    deleteChatSession,
    submitCounselingReferral,
    saveMaterial,
    deleteMaterial,
    saveCategory,
    deleteCategory,
    saveArticle,
    deleteArticle,
    saveAnnouncement,
    deleteAnnouncement,
    saveSiteSetting,
    updateReferralStatus,
    updateStudentAccount,
    assignStaffRole,
    removeStaffRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
