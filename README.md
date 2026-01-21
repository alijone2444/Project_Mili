# Healing & Reconciliation Website for Maleeha

A beautiful, peaceful single-page website designed to provide a safe space for healing and reconciliation.

## Features

- 🌊 **Navy-to-Peach Gradient Background** - Calming visual aesthetic
- ✨ **Particle Effects** - Slow-moving stardust particles for a peaceful atmosphere
- 🪟 **Glassmorphism Design** - Modern, elegant semi-transparent containers
- 🛡️ **The Truth** - Section addressing past misunderstandings
- ❤️ **Our Timeline** - Memories and support moments
- ☁️ **Safe Space** - Breathing exercises for stress relief
- 🌱 **The Promise** - Future-focused healing messages
- 💝 **Interactive Heart** - Click to reveal positive affirmations
- 🌪️ **Venting Box** - Release thoughts that dissolve into stars (data stored locally)

## Files

- `index.html` - Main HTML file with all sections
- `styles.css` - All styling including glassmorphism effects
- `script.js` - Interactive features, particles, animations
- `data.json` - JSON file for venting box data storage

## How to Deploy

### Simple Deployment Options:

1. **GitHub Pages:**
   - Push these files to a GitHub repository
   - Go to Settings > Pages
   - Select main branch and save
   - Your site will be live at `username.github.io/repository-name`

2. **Netlify:**
   - Drag and drop the folder to Netlify
   - Or connect your GitHub repository
   - Auto-deploy on every push

3. **Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Follow the prompts

4. **Any Static Host:**
   - Simply upload all files to your web hosting service
   - Ensure `index.html` is in the root directory

## Data Storage

The venting box data is stored in the browser's localStorage. This means:
- Data persists between sessions for the same browser
- No backend required
- Completely private and local to the user

To export data:
- Open browser console (F12)
- Run: `localStorage.getItem('ventingData')`
- Copy the JSON and save as needed

## Customization

- Edit `index.html` to change text content
- Modify `styles.css` to adjust colors, fonts, or spacing
- Update `script.js` to change particle count, animations, or interactions

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- The website is designed to be lightweight and load quickly
- All animations are CSS-based for smooth performance
- Particle effects use HTML5 Canvas
- Fully responsive for mobile devices

---

Created with care and intention for healing and peace. 🕊️
