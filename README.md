# Rômulo Mastelari Portfolio

A modern, responsive portfolio website built with Angular 17.3, showcasing a front-end developer's skills and projects.

## Features

- **Modern Design**: Clean, elegant layout with generous spacing and readable typography
- **Theme Switching**: Multiple color themes (Green, Blue, Red, and Dark mode)
- **Responsive Layout**: Mobile-first approach with optimized views for all device sizes
- **GitHub Integration**: Dynamically fetches and displays repositories
- **Contact Form**: Includes form validation and success feedback
- **Animations**: Subtle hover effects and smooth scrolling

## Technologies Used

- Angular 17.3
- TypeScript
- SCSS with CSS Variables
- GitHub API
- Material Icons

## Project Structure

```
src/
├── app/
│   ├── features/
│   │   ├── about/
│   │   ├── projects/
│   │   └── contact/
│   ├── services/
│   │   └── theme.service.ts
│   ├── shared/
│   │   ├── header/
│   │   ├── footer/
│   │   └── theme-switcher/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
├── styles/
│   └── variables.scss
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/romulomastelari/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Building for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Customization

### Themes

The application includes four themes:
- Light Green (default)
- Light Blue
- Light Red
- Dark

Themes are implemented using CSS custom properties (variables) and can be easily modified in `src/styles/variables.scss`.

### Content

To customize the content:
- Update personal information in the About component
- Add your GitHub username in the Projects service to fetch your repositories
- Update contact information in the Contact component

## Browser Support

The portfolio is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
