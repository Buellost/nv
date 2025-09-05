# Guide de Contribution

Merci de votre intérêt pour contribuer au Club des Étoiles VN Engine !

## 🚀 Comment contribuer

### Signaler un bug
1. Vérifiez que le bug n'a pas déjà été signalé dans les [issues](../../issues)
2. Créez une nouvelle issue avec le template "Bug Report"
3. Décrivez le problème de manière claire et détaillée
4. Incluez les étapes pour reproduire le bug
5. Précisez votre navigateur et version

### Proposer une fonctionnalité
1. Créez une issue avec le template "Feature Request"
2. Expliquez clairement le besoin et la solution proposée
3. Discutez avec l'équipe avant de commencer le développement

### Soumettre du code

#### Prérequis
- Connaissance de JavaScript ES6+
- Familiarité avec HTML5 et CSS3
- Compréhension des principes des Visual Novels

#### Processus
1. **Fork** le repository
2. **Clone** votre fork localement
3. Créez une **branche** pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```
4. **Développez** en suivant les standards du projet
5. **Testez** vos modifications sur plusieurs navigateurs
6. **Committez** avec des messages clairs :
   ```bash
   git commit -m "feat: ajout du système de sauvegarde cloud"
   ```
7. **Push** vers votre fork
8. Ouvrez une **Pull Request**

## 📋 Standards de code

### JavaScript
- Utilisez ES6+ (const/let, arrow functions, etc.)
- Indentation : 4 espaces
- Nommage : camelCase pour les variables et fonctions
- Commentaires en français pour la documentation
- Évitez les dépendances externes

### CSS
- Suivez la convention BEM si possible
- Utilisez les custom properties (variables CSS)
- Mobile-first responsive design
- Commentaires pour les sections importantes

### Structure des commits
```
type(scope): description courte

Description plus détaillée si nécessaire

Closes #123
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🧪 Tests

Avant de soumettre :
1. Testez sur Chrome, Firefox, Safari
2. Vérifiez la compatibilité mobile
3. Testez toutes les fonctionnalités modifiées
4. Assurez-vous qu'aucune régression n'est introduite

## 📝 Documentation

- Documentez les nouvelles fonctionnalités dans le README
- Ajoutez des commentaires JSDoc pour les nouvelles fonctions
- Mettez à jour les exemples si nécessaire

## 🎯 Priorités actuelles

1. **Performance** : Optimisation du moteur
2. **Accessibilité** : Support screen readers
3. **Fonctionnalités** : Système de plugins
4. **Documentation** : Tutoriels et guides

## ❓ Questions

Pour toute question, n'hésitez pas à :
- Ouvrir une issue de discussion
- Rejoindre notre [Discord](lien-discord) (si applicable)
- Contacter les mainteneurs

## 🙏 Reconnaissance

Tous les contributeurs seront mentionnés dans le README et les release notes.

Merci de contribuer à rendre les Visual Novels plus accessibles ! ❤️
