🛒 Project Overview: Shopping_WE
A React + PHP-based Shopping Web App that allows users to register, log in, view products, add items to the cart, and manage their profile. The backend is powered by PHP and runs under XAMPP in the htdocs/backend folder.

🔷 Frontend (React)
Directory: D:\Files\Academy\6th_sem\Shopping_WE\src\components

File/Component	Description
Cart.jsx	A minimal or utility component representing a single cart item or a shortcut to cart actions. Likely used inside Cartpage.jsx.
Cartpage.jsx	Full cart display. Shows all items added to the cart with functionality to remove items, update quantities, and proceed to checkout. Communicates with GetCart.php.
Home.jsx	The landing page for the application. Could contain featured products, categories, or banners.
Login.jsx	User authentication component. Allows users to log in. Sends credentials to Login.php.
Nav.jsx	The top navigation bar component. Likely contains links to Home, Products, Cart, Profile, etc.
Products.jsx	Displays all available products fetched from the backend via Products.php. May include filtering and sorting features.
Profile.jsx	Displays user information like name, email, bio, location, etc. Likely fetches data from GetUser.php.
Register.jsx	Allows new users to sign up. Sends registration data to Register.php.

Other important frontend files:

File	Description
Main_component.jsx	Likely acts as the main routing controller or dashboard wrapper for React routes (e.g., Home, Products, etc.).
main.jsx	The React entry point. Renders the app to the DOM using ReactDOM.
index.css	Global CSS file for styling components.

🔶 Backend (PHP)
Directory: C:\xampp\htdocs\backend

File Name	Description
Cart.php	Handles adding or removing items in the user’s cart. Accepts POST requests from Cart.jsx or Cartpage.jsx.
GetCart.php	Fetches the list of items in a user’s cart. Responds with JSON data consumed by Cartpage.jsx.
GetUser.php	Returns logged-in user's profile information. Used in Profile.jsx.
Login.php	Verifies user credentials. Responds with success/failure and session handling for Login.jsx.
Products.php	Returns a list of all products from the database. JSON response used by Products.jsx.
Register.php	Accepts registration data and stores a new user in the database. Used by Register.jsx.

🌐 App Flow Summary
Register/Login: User signs up via Register.jsx (Register.php) or logs in via Login.jsx (Login.php).

Products: Products.jsx fetches product data from Products.php.

Cart Management: Users can add/remove items via Cart.jsx and view them in Cartpage.jsx, which interacts with Cart.php and GetCart.php.

User Profile: Profile.jsx fetches and displays data from GetUser.php.

Navigation: Nav.jsx allows moving between sections.

Routing: Handled likely by Main_component.jsx (using react-router).


Fontend Directory Tree:
D:\Files\Academy\6th_sem\Shopping_WE\src\components
Shopping_WE/
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
│
├── 📁 node_modules/         # Installed dependencies
├── 📁 public/               # Static assets (if any)
└── 📁 src/                  # Source code
    ├── index.css
    ├── main.jsx
    ├── Main_component.jsx   # Main routing or layout component
    │
    ├── 📁 assets/           # Images, icons, etc.
    └── 📁 components/       # React Components
        ├── Cart.jsx
        ├── Cartpage.jsx
        ├── Home.jsx
        ├── Login.jsx
        ├── Nav.jsx
        ├── Products.jsx
        ├── Profile.jsx
        └── Register.jsx
        
Backend Directory Tree:
C:\xampp\htdocs\backend
backend/
├── Cart.php           # Handles add/remove cart operations
├── GetCart.php        # Fetches cart items
├── GetUser.php        # Returns user profile data
├── Login.php          # Authenticates user
├── Products.php       # Provides product list
└── Register.php       # Handles user registration

