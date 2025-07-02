import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Tasks from '@/components/pages/Tasks';
import Timer from '@/components/pages/Timer';
import Settings from '@/components/pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
<Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="z-50"
        />
      </div>
    </Router>
  );
}

export default App;