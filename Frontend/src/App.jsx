
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/common/Header';
import Router from './Router';
import "./assets/styles/App.css";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main className="pt-16 lg:pt-18">
            <Router />
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
