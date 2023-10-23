import { useEffect, useState } from 'react';

export const App = () => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  console.log({ theme });
  return (
    <div className="h-screen bg-white dark:bg-black justify-center items-center text-center">
      <div>
        <h1 className="dark:text-content-primary">TEXT</h1>
      </div>

      <div>
        <button
          className="bg-green-200 p-4 rounded-3xl text-content-danger-secondary"
          onClick={handleSwitchTheme}
        >
          Change theme
        </button>
      </div>
    </div>
  );
};
