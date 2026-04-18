# NISBadges Documentation Website

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.x installed
- pip (Python package manager)

### Installation & Setup

1. **Install Django** (if not already installed):
```bash
pip install django
```

2. **Navigate to project directory**:
```bash
cd c:\Users\sagar\OneDrive\Desktop\nisbadges_doc
```

3. **Run migrations** (already done, but if needed):
```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Start the development server**:
```bash
python manage.py runserver
```

5. **Open your browser** and visit:
```
http://127.0.0.1:8000/
```

### 🎯 Features Implemented

✅ **Django Backend**
- SiteStat model to track page views
- SQLite database (auto-created as db.sqlite3)
- View counter increments on every page load

✅ **Frontend Features**
- Live ticking clock (updates every second)
- Real-time page view counter from Django
- Fully responsive Bootstrap 5 layout
- AOS.js scroll animations
- FontAwesome icons

✅ **Premium UI/UX**
- Dark theme with glassmorphism effects
- Animated background particles
- Three distinct tier cards (PRO/ELITE/PRIME)
- Color-coded tiers: Silver, Gold, Diamond/Cyan
- Smooth hover effects with glowing shadows
- Premium CSS animations

✅ **Content Sections**
- Overview of NISBadges initiative
- "Why It Matters" with 4 feature cards
- Three tier cards with detailed descriptions
- Responsive design for all devices

### 📁 Project Structure

```
nisbadges_doc/
├── nisbadges_project/      # Django project settings
│   ├── settings.py         # Project configuration
│   ├── urls.py            # Main URL routing
│   └── wsgi.py
├── docs/                   # Django app
│   ├── models.py          # SiteStat model
│   ├── views.py           # Home view with counter
│   ├── urls.py            # App URL routing
│   └── migrations/
├── templates/
│   └── index.html         # Main template with all CSS/JS
├── db.sqlite3             # SQLite database
└── manage.py              # Django management script
```

### 🎨 Customization

**Change Tier Colors**: Edit the CSS classes in `templates/index.html`:
- `.tier-pro` - Silver theme
- `.tier-elite` - Gold theme
- `.tier-prime` - Diamond/Cyan theme

**Adjust Animations**: Modify AOS attributes:
- `data-aos="fade-up"` - Animation type
- `data-aos-delay="100"` - Delay in milliseconds
- `data-aos-duration="1000"` - Animation duration

**Reset Page Counter**: Delete `db.sqlite3` and run migrations again

### 🛠️ Technologies Used

- **Backend**: Django 6.0.2, Python 3.14.3, SQLite
- **Frontend**: HTML5, Vanilla JavaScript, Bootstrap 5
- **Animations**: AOS.js (Animate On Scroll)
- **Icons**: FontAwesome 6.4.0
- **Styling**: Custom CSS with glassmorphism and gradients

### 📝 Notes

- The page view counter persists across server restarts (stored in database)
- Live clock shows system time in 24-hour format
- All animations are optimized for performance
- Fully responsive design works on mobile, tablet, and desktop

### 🎉 Enjoy Your NISBadges Website!

The site is now ready to use. Every time you refresh the page, the view counter will increment!
