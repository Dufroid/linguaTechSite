# 📅 System de Gestion de Rendez-vous — LinguaTech

Application web professionnelle full-stack de gestion de rendez-vous pour **LinguaTech** (Startup & Centre de Formation à Kinshasa).

Ce système permet aux visiteurs de prendre rendez-vous en direct selon les créneaux réellement ouverts par l'administrateur, tout en offrant à l'équipe LinguaTech un espace d'administration complet avec synchronisation Google Calendar et notifications e-mail.

---

## 🚀 Fonctionnalités Clés

### Côté Visiteur (Public)
- **Réservation en 4 Étapes** : Choix de date $\rightarrow$ Sélection de créneau libre $\rightarrow$ Formulaire coordonnées $\rightarrow$ Confirmation instantanée.
- **Vérification Dynamique** : Les créneaux réservés ou fermés par l'administrateur sont automatiquement masqués.
- **Prévention Anti-Double Réservation** : Contrôle atomique MongoDB avec contrainte d'unicité composée sur `(date, startTime)`.
- **Rappels et Confirmation** : Notifications par e-mail et lien WhatsApp direct.

### Côté Administrateur (`/admin`)
- **Tableau de Bord Analytics** : Métriques en temps réel (aujourd'hui, cette semaine, total, confirmés, prochains RDV).
- **Gestion des Disponibilités** : Ouverture de créneaux par date, blocage de journées et génération groupée (ex: 7 ou 14 jours).
- **Gestionnaire de Rendez-vous** : Filtrage par statut, date, recherche textuelle, confirmation, annulation et suppression.
- **Sécurité JWT** : Accès protégé aux API d'administration via tokens JWT et mots de passe hashés avec `bcrypt`.
- **Google Calendar & Fuseau Horaire** : Intégration dans le calendrier Google officiel sous le fuseau `Africa/Kinshasa`.

---

## 🛠️ Stack Technique

- **Frontend** : React 18, Vite, React Router v6, Axios, Lucide Icons, CSS3 Modern Flex/Grid.
- **Backend** : Node.js, Express.js (REST API CommonJS).
- **Base de Données** : MongoDB Atlas / Mongoose.
- **Sécurité** : JWT (JSON Web Tokens), bcryptjs, Express Rate Limit.
- **Services** : Nodemailer (E-mails), Googleapis (Google Calendar API), Schedule Reminder Worker.

---

## 📁 Architecture du Projet

```text
Ligua-Tech/
├── src/
│   ├── api/
│   │   └── api.js                  # Client Axios configuré
│   ├── components/
│   │   ├── booking/
│   │   │   ├── BookingCalendar.jsx # Étape 1 : Sélection date
│   │   │   ├── TimeSlotSelector.jsx# Étape 2 : Choix du créneau
│   │   │   ├── AppointmentForm.jsx # Étape 3 : Formulaire client
│   │   │   ├── BookingSuccess.jsx  # Étape 4 : Carte confirmation
│   │   │   ├── BookingWizard.jsx   # Orchestrateur du stepper
│   │   │   └── Booking.css         # Styles visuels réservation
│   │   ├── Contact.jsx             # Section contact intégrée au site
│   │   └── Navbar.jsx              # Barre de navigation responsive
│   ├── context/
│   │   └── AuthContext.jsx         # Context d'authentification admin
│   ├── pages/
│   │   ├── BookAppointment.jsx     # Page dédiée /appointment
│   │   ├── AdminLogin.jsx          # Connexion /admin/login
│   │   ├── AdminDashboard.jsx      # Dashboard /admin/dashboard
│   │   ├── ManageAvailability.jsx  # Agenda /admin/availability
│   │   ├── Appointments.jsx        # Table /admin/appointments
│   │   └── Admin.css               # Styles du portail admin
│   ├── routes/
│   │   └── ProtectedRoute.jsx      # Guard d'accès admin
│   ├── App.jsx
│   └── main.jsx
│
├── Backend/
│   ├── config/
│   │   ├── db.js                   # Connexion MongoDB Mongoose
│   │   └── google.js               # OAuth2 Client Google
│   ├── controllers/
│   │   ├── authController.js       # Authentification admin
│   │   ├── availabilityController.js# Gestion des créneaux
│   │   ├── appointmentController.js # Réservation & statuts
│   │   └── dashboardController.js  # Calcul des statistiques
│   ├── middleware/
│   │   ├── authMiddleware.js       # Protection JWT
│   │   ├── errorMiddleware.js      # Gestionnaire d'erreurs
│   │   └── validateMiddleware.js   # Validation des données
│   ├── models/
│   │   ├── Admin.js                # Schéma administrateur
│   │   ├── Availability.js         # Schéma disponibilités
│   │   └── Appointment.js          # Schéma rendez-vous + Index unique
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── availabilityRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── emailService.js         # Notifications Nodemailer
│   │   ├── calendarService.js      # Intégration Google Calendar
│   │   └── reminderService.js      # Cron des rappels 24h/1h
│   ├── seedAdmin.js                # Initialisation admin & créneaux
│   ├── server.js                   # Point d'entrée serveur Express
│   └── .env                        # Variables d'environnement
└── README.md
```

---

## ⚙️ Installation & Configuration

### 1. Prérequis
- Node.js (version 18 ou supérieure)
- MongoDB installé localement OU une URI MongoDB Atlas.

### 2. Configuration du Backend
1. Déplacez-vous dans le dossier backend :
   ```bash
   cd Backend
   ```
2. Installez les dépendances :
   ```bash
   npm.cmd install
   ```
3. Créez un fichier `.env` à la racine de `Backend/` (se référer au fichier `.env.example`) :
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/linguatech_appointments

   JWT_SECRET=linguatech_secret_key_2026_change_in_production
   JWT_EXPIRES_IN=7d

   ADMIN_EMAIL=admin@linguatech.com
   SETUP_KEY=linguatech_setup_2026

   # Facultatif: Intégration Google Calendar & Gmail SMTP
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_REFRESH_TOKEN=
   GMAIL_USER=
   GMAIL_PASS=
   ```

4. Exécutez le script d'initialisation (Seeder) pour créer le compte administrateur par défaut et peupler l'agenda pour les 14 prochains jours :
   ```bash
   node seedAdmin.js
   ```

   **Identifiants Admin par défaut :**
   - **Email** : `admin@linguatech.com`
   - **Mot de passe** : `Admin@123456`

### 3. Lancement du Backend
```bash
node server.js
```
Le serveur démarrera sur `http://localhost:5000`.

---

## 💻 Lancement du Frontend (React / Vite)

1. Ouvrez un terminal à la racine du projet (`Ligua-Tech`) :
   ```bash
   npm.cmd install
   ```
2. Lancez le serveur de développement Vite :
   ```bash
   npm.cmd run dev
   ```
3. Ouvrez votre navigateur sur `http://localhost:5173`.

---

## 🔗 Documentation des Routes API

### Authentification Admin
- `POST /api/auth/login` : Connexion administrateur.
- `GET  /api/auth/me` : Obtenir le profil admin connecté.

### Disponibilités (Agenda)
- `GET  /api/availability` : Liste des dates disponibles (Public).
- `GET  /api/availability/:date` : Obtenir les créneaux pour une date précise (Public).
- `POST /api/admin/availability` : Ajouter ou modifier les créneaux d'une date (Admin).
- `POST /api/admin/availability/bulk` : Générer les créneaux sur plusieurs jours (Admin).
- `DELETE /api/admin/availability/:id` : Supprimer une date (Admin).

### Rendez-vous
- `POST /api/appointments` : Créer un rendez-vous (Public avec vérification atomique).
- `GET  /api/appointments/:id` : Obtenir les détails d'un rendez-vous (Public).
- `POST /api/appointments/:id/cancel` : Annuler un rendez-vous (Public).
- `GET  /api/admin/appointments` : Liste filtrable des rendez-vous (Admin).
- `PATCH /api/admin/appointments/:id` : Modifier le statut (`confirmed`, `cancelled`, `completed`) (Admin).
- `DELETE /api/admin/appointments/:id` : Supprimer définitivement un rendez-vous (Admin).

### Dashboard
- `GET /api/admin/dashboard` : Métriques et statistiques globales (Admin).

---

## 🎨 Production Build
Pour générer le bundle optimisé pour la production frontend :
```bash
npm.cmd run build
```
Les fichiers statiques seront générés dans le dossier `dist/`.