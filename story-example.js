// Exemple d'histoire pour démonstration
// Remplacez ce fichier par votre propre histoire

const gameStory = {
    start: {
        text: "Bienvenue dans Simple VN Engine ! Ceci est un exemple d'histoire pour démontrer les capacités du moteur.",
        character: "Narrateur",
        audio: "ambient-demo.mp3", // Fichier audio optionnel
        choices: [
            { text: "Découvrir les fonctionnalités", next: "features" },
            { text: "Voir un dialogue", next: "dialogue_example" }
        ]
    },

    features: {
        text: "Ce moteur supporte : les sprites animés, l'audio avec transitions, les sauvegardes, les choix multiples, et bien plus !",
        character: "Système",
        choices: [
            { text: "Voir un exemple de personnage", next: "character_example" },
            { text: "Retour au début", next: "start" }
        ]
    },

    dialogue_example: {
        text: "Salut ! Je suis un personnage d'exemple. Mes sprites changent selon mes émotions !",
        character: "Alex",
        sprite: "alex_happy.png", // Image optionnelle
        choices: [
            { text: "Comment ça marche ?", next: "explanation" },
            { text: "Montrer une autre émotion", next: "character_sad" }
        ]
    },

    character_example: {
        text: "Voici comment créer des personnages expressifs avec des sprites différents.",
        character: "Alex",
        sprite: "alex_normal.png",
        choices: [
            { text: "Alex content", next: "alex_happy" },
            { text: "Alex triste", next: "character_sad" },
            { text: "Retour au menu", next: "start" }
        ]
    },

    alex_happy: {
        text: "Je suis content ! 😊 Voyez comme mon sprite change !",
        character: "Alex",
        sprite: "alex_happy.png",
        choices: [
            { text: "Essayer autre chose", next: "features" },
            { text: "Recommencer", next: "start" }
        ]
    },

    character_sad: {
        text: "Oh... je suis un peu triste maintenant... 😢",
        character: "Alex",
        sprite: "alex_sad.png",
        choices: [
            { text: "Remonter le moral", next: "alex_happy" },
            { text: "Voir les fonctionnalités", next: "features" }
        ]
    },

    explanation: {
        text: "Le moteur charge automatiquement les sprites depuis le dossier 'sprites/'. Il suffit de spécifier le nom du fichier !",
        character: "Alex",
        sprite: "alex_explaining.png",
        choices: [
            { text: "C'est génial !", next: "alex_happy" },
            { text: "Retour au début", next: "start" }
        ]
    }
};

// Variables d'exemple (optionnel)
const gameVariables = {
    player_name: "Joueur",
    demo_completed: false
};

// Configuration d'exemple (optionnel)
const gameConfig = {
    title: "Simple VN Engine - Démo",
    version: "1.0.0",
    auto_save: true
};
