export type Locale = "en" | "fr"

export const translations = {
  en: {
    // Landing Page
    "landing.title": "Plan Your Tasks Easily",
    "landing.subtitle": "Manage your tasks, stay productive, and never miss anything",
    "landing.cta": "Get Started",
    "landing.login": "Sign In",
    "landing.register": "Sign Up",
    "landing.feature1.title": "Simple Organization",
    "landing.feature1.desc": "Create, edit, and organize your tasks in just a few clicks with an intuitive interface",
    "landing.feature2.title": "Priority Tracking",
    "landing.feature2.desc": "Set priorities and deadlines to stay focused on what matters most",
    "landing.feature3.title": "Never Miss Anything",
    "landing.feature3.desc": "Keep a complete view of all your tasks and progress efficiently",
    "landing.footer": "© 2025 Planit. All rights reserved.",

    // Auth
    "auth.login.title": "Sign In",
    "auth.login.description": "Enter your credentials to access your account",
    "auth.login.email": "Email",
    "auth.login.password": "Password",
    "auth.login.forgot": "Forgot password?",
    "auth.login.button": "Sign In",
    "auth.register.title": "Create Account",
    "auth.register.description": "Enter your details to get started",
    "auth.register.name": "Full Name",
    "auth.register.button": "Create Account",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Welcome back! Here's an overview of your tasks.",
    "dashboard.total": "Total Tasks",
    "dashboard.pending": "Pending",
    "dashboard.inProgress": "In Progress",
    "dashboard.completed": "Completed",
  },
  fr: {
    // Landing Page
    "landing.title": "Planifiez vos tâches facilement",
    "landing.subtitle": "Gérez vos tâches, restez productif et ne manquez rien",
    "landing.cta": "Commencer",
    "landing.login": "Connexion",
    "landing.register": "S'inscrire",
    "landing.feature1.title": "Organisation simple",
    "landing.feature1.desc": "Créez, modifiez et organisez vos tâches en quelques clics avec une interface intuitive",
    "landing.feature2.title": "Suivi des priorités",
    "landing.feature2.desc": "Définissez des priorités et des échéances pour rester concentré sur l'essentiel",
    "landing.feature3.title": "Ne manquez rien",
    "landing.feature3.desc": "Gardez une vue complète de toutes vos tâches et progressez efficacement",
    "landing.footer": "© 2025 Planit. Tous droits réservés.",

    // Auth
    "auth.login.title": "Connexion",
    "auth.login.description": "Entrez vos identifiants pour accéder à votre compte",
    "auth.login.email": "Email",
    "auth.login.password": "Mot de passe",
    "auth.login.forgot": "Mot de passe oublié ?",
    "auth.login.button": "Se connecter",
    "auth.register.title": "Créer un compte",
    "auth.register.description": "Entrez vos informations pour commencer",
    "auth.register.name": "Nom complet",
    "auth.register.button": "Créer un compte",

    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.subtitle": "Bienvenue ! Voici un aperçu de vos tâches.",
    "dashboard.total": "Total des tâches",
    "dashboard.pending": "En attente",
    "dashboard.inProgress": "En cours",
    "dashboard.completed": "Terminées",
  },
}

export function useTranslation(locale: Locale = "en") {
  return {
    t: (key: keyof typeof translations.en) => translations[locale][key] || key,
    locale,
  }
}
