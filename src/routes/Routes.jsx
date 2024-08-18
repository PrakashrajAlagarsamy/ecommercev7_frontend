import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { AuthProvider } from '../context/authContext';
import AppLayout from '../components/layouts/AppLayout';
import AppBottomNavigation from '../components/layouts/AppBottom';
import HomePage from '../pages/index';
import Categories from '../pages/categories';

function AppRouter(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm', 'xs'));
    return(
        <Router>
            <AuthProvider>
                <AppLayout>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<HomePage/>} />
                            <Route path="/categories" element={<Categories/>} />

                            {/* Catch-all Route for 404 */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </AppLayout>
                {isMobile && (
                    <AppBottomNavigation/>
                )}
            </AuthProvider>
        </Router>
    )
};
export default AppRouter;