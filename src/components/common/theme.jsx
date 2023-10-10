import { useTheme } from 'next-themes';

const Theme = () => {
    const { theme, setTheme } = useTheme();
    return (
        <>  
            <div className="dark-light-wrapper">
                <label htmlFor="dark-light-checkbox" className="dark-light-label">
                    <input type="checkbox" className="dark-light-checkbox" id="dark-light-checkbox" />
                    <p 
                        className="switcher swith-to-light"
                        onClick={() => setTheme( theme === 'light' ? 'dark' : 'light' )}
                    >Light
                    </p>

                    <p 
                        className="switcher swith-to-dark"
                        onClick={() => setTheme( theme === 'light' ? 'dark' : 'light' )}
                    >Dark
                    </p>
                    
                    <div className="dark-light-ball">
                        <div className="dark-light-ball-inner" onClick={() => setTheme( theme === 'light' ? 'dark' : 'light' )}>
                            <i 
                                className="sun-icon ri-sun-fill"
                                onClick={() => setTheme('dark')}
                            ></i>
                            <i 
                                className="moon-icon ri-moon-fill"
                                onClick={() => setTheme('light')}
                            ></i>
                        </div>
                    </div>
                </label>
            </div>
        </>
    )
}

export default Theme;