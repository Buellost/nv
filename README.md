# 🎮 Simple Visual Novel Engine

Un moteur de visual novel léger et personnalisable en JavaScript vanilla. Créez facilement vos propres histoires interactives !

## 🚀 Démarrage rapide

1. **Téléchargez les fichiers du moteur** :
   - `simple-vn-engine.js` (moteur principal)
   - `style.css` (styles de base)
   - `index-demo.html` (exemple d'utilisation)
   - `story-example.js` (histoire d'exemple)

2. **Créez votre histoire** en remplaçant `story-example.js`

3. **Ouvrez dans votre navigateur** via un serveur local

## 📁 Structure minimale

```
votre-projet/
├── simple-vn-engine.js  # Le moteur (obligatoire)
├── style.css            # Styles (personnalisable)
├── index.html           # Votre page principale
├── story.js             # Votre histoire
├── sprites/             # Images des personnages
└── audio/               # Fichiers audio (optionnel)
```

## ✨ Fonctionnalités

- 🎯 **Zéro dépendance** - Juste du JavaScript vanilla
- 🎵 **Système audio** - Musique d'ambiance avec transitions douces
- 🖼️ **Sprites dynamiques** - Personnages avec expressions multiples
- 💾 **Sauvegarde/Chargement** - Progression automatique
- ⚙️ **Menu d'options** - Volume, vitesse, préférences
- ⏯️ **Mode auto-play** - Lecture automatique configurable
- ⌨️ **Raccourcis clavier** - Navigation rapide
- 📱 **Design responsive** - Compatible mobile et desktop

## 🎮 Utilisation de base

### 1. Créer votre histoire

```javascript
// story.js
const gameStory = {
    start: {
        text: "Votre histoire commence ici...",
        character: "Narrateur",
        choices: [
            { text: "Continuer", next: "scene2" }
        ]
    },
    scene2: {
        text: "Salut ! Je suis un personnage.",
        character: "Alex",
        sprite: "alex_happy.png",
        audio: "musique-douce.mp3",
        choices: [
            { text: "Répondre", next: "scene3" },
            { text: "Ignorer", next: "scene4" }
        ]
    }
};
```

### 2. HTML de base

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon Visual Novel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <!-- L'interface sera générée automatiquement -->
    </div>
    
    <script src="simple-vn-engine.js"></script>
    <script src="story.js"></script>
    <script>
        gameEngine.init();
        gameEngine.start('start');
    </script>
</body>
</html>
```

## 📖 Format des scènes

```javascript
{
    text: "Dialogue ou narration",           // Texte affiché
    character: "Nom du personnage",         // Nom affiché
    sprite: "personnage_emotion.png",       // Image (optionnel)
    audio: "musique.mp3",                   // Audio (optionnel)
    background: "fond.jpg",                 // Arrière-plan (optionnel)
    choices: [                              // Choix du joueur
        { 
            text: "Option 1", 
            next: "scene_suivante",
            condition: "variable > 5"        // Condition (optionnel)
        }
    ]
}
```

## 🎨 Personnalisation CSS

Le moteur utilise des variables CSS personnalisables :

```css
:root {
    --primary-color: #4a90e2;
    --text-color: #ffffff;
    --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --text-box-bg: rgba(0, 0, 0, 0.8);
}
```

## ⌨️ Raccourcis clavier

| Touche | Action |
|--------|--------|
| `Espace` / `Entrée` | Dialogue suivant |
| `Échap` | Menu options |
| `F5` | Sauvegarde rapide |
| `F9` | Chargement rapide |
| `A` | Toggle auto-play |

## 🔧 API du moteur

### Méthodes principales

```javascript
// Initialiser le moteur
gameEngine.init();

// Démarrer l'histoire
gameEngine.start('scene_id');

// Gérer les variables
gameEngine.setVariable('nom', 'valeur');
gameEngine.getVariable('nom');

// Sauvegarder/Charger
gameEngine.saveGame();
gameEngine.loadGame();
```

## 📱 Exemple complet

Voir `index-demo.html` et `story-example.js` pour un exemple fonctionnel complet.

## 🤝 Contribuer

Les contributions sont bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour les détails.

## 🆘 Support

- 🐛 [Signaler un bug](https://github.com/votre-username/simple-vn-engine/issues)
- ✨ [Demander une fonctionnalité](https://github.com/votre-username/simple-vn-engine/issues)
- 📚 [Documentation](https://github.com/votre-username/simple-vn-engine/wiki)

---

Créé avec ❤️ pour les créateurs d'histoires interactives
