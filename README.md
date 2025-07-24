# 🚀 KwickCV - AI-Powered CV Builder

![KwickCV Banner](https://img.shields.io/badge/KwickCV-AI%20Powered-blue?style=for-the-badge&logo=react)

A modern, professional CV builder with **AI-powered content suggestions** built with React and Vite. Create stunning CVs with intelligent assistance and real-time feedback.

## ✨ Key Features

### 🤖 **AI-Powered Content Assistance**
- **Real-time CV scoring** (0-100) with detailed feedback
- **Smart auto-complete** for skills, companies, and job titles
- **Intelligent content suggestions** with action verbs and metrics
- **Industry-specific keyword recommendations**
- **Professional writing tips** as you type

### 📄 **Professional CV Templates**
- **4 Premium Templates**: Modern, Classic, Creative, Minimal
- **Print-optimized layouts** with perfect formatting
- **Real-time preview** with instant updates
- **Mobile-responsive design**

### 🎯 **Smart Form Experience**
- **Contextual suggestions** for better content
- **Auto-complete databases** with 100+ skills and companies
- **Real-time validation** and improvement tips
- **Keyboard navigation** support

### 💾 **Advanced Features**
- **Auto-save functionality** with localStorage persistence
- **Print & PDF export** capabilities
- **Dark/Light mode** support
- **Progress tracking** across all sections
- **Responsive design** for all devices

## 🛠 Tech Stack

- **Frontend**: React 18+ with Hooks
- **Build Tool**: Vite for fast development
- **Styling**: Modern CSS with Flexbox/Grid
- **AI Service**: Custom intelligent suggestion engine
- **State Management**: React Context API
- **Storage**: localStorage for data persistence

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaakyire9/kwickcv.git
   cd kwickcv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5180
   ```

## 🎯 AI Features Showcase

### Intelligent Suggestions Panel
- **Fixed floating panel** with collapsible interface
- **Three-tab system**: Overview, Suggestions, Analysis
- **Real-time CV scoring** with visual progress bars
- **Personalized improvement recommendations**

### Smart Input Components
- **Auto-complete suggestions** as you type
- **Context-aware recommendations** for different fields
- **Keyboard navigation** (arrow keys, enter, escape)
- **Professional content tips** for better writing

### Content Analysis Engine
- **Action verb detection** for stronger descriptions
- **Quantifiable metrics identification** for impact
- **Industry keyword optimization** for ATS systems
- **Professional tone analysis** and suggestions

## 📋 CV Sections

1. **Personal Information** - Contact details and professional summary
2. **Skills** - Technical and soft skills with proficiency levels
3. **Experience** - Work history with intelligent description assistance
4. **Education** - Academic background and certifications
5. **Projects** - Portfolio showcases and achievements
6. **Additional Sections** - Languages, certifications, awards

## 🎨 Template Showcase

### Modern Professional
- Clean, contemporary design with accent colors
- Perfect for tech and creative industries
- Optimized spacing and typography

### Classic Traditional
- Time-tested format for conservative industries
- Professional serif typography
- Traditional section layouts

### Creative Designer
- Bold, innovative layout for creative professionals
- Eye-catching design elements
- Perfect for design portfolios

### Minimal Clean
- Minimalist approach focusing on content
- Clean lines and plenty of white space
- Universal appeal across industries

## 🔧 Advanced Configuration

### AI Suggestion Customization
```javascript
// Extend AI suggestions in services/aiSuggestions.js
const customSuggestions = {
  newCategory: {
    // Add your custom suggestion logic
  }
};
```

### Template Customization
```css
/* Customize templates in styles/Templates.css */
.cv-template.custom-template {
  /* Your custom styling */
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
- Connect your GitHub repository
- Set build command: `npm run build`
- Set output directory: `dist`

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with **React** and **Vite** for optimal performance
- AI suggestions powered by custom intelligent algorithms
- Responsive design principles for modern web applications
- Professional typography and spacing for print optimization

---

**Ready to build your professional CV?** [Get Started →](http://localhost:5180)

![CV Builder Demo](https://img.shields.io/badge/Demo-Live%20Preview-green?style=for-the-badge&logo=vercel)
