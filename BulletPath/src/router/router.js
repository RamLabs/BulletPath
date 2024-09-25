import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue'; // Importera din startsida
import TrajectoryCalculator from '@/components/TrajectoryCalculator.vue'; // Importera din framtida komponent
import MPBR from '@/components/MPBR.vue'; // Importera framtida komponent för MPBR
import About from '@/components/About.vue';

// Defined routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/trajectory-calculator',
    name: 'TrajectoryCalculator',
    component: TrajectoryCalculator, 
  },
  {
    path: '/MPBR',
    name: 'MPBR',
    component: MPBR, 
  },
  {
    path: '/about',
    name: 'About',
    component: About, 
  },
];

// Create the router
const router = createRouter({
  history: createWebHistory(), 
  routes, 
});

export default router;
