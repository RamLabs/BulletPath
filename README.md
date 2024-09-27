# BulletPath

**BulletPath** is an application that calculates the bullet's height at a given distance based on several key parameters:

- **Muzzle Velocity:** The initial speed of the bullet.
- **Zeroing Distance:** The distance at which the rifle is calibrated (zeroed).
- **Ballistic Coefficient:** A measure of the bullet's ability to overcome air resistance during flight.
- **Distance:** The target distance for the height calculation.

The application implements the analytical solution described in the following source by Mark Biegert, who provides the derivation of 
the Pejsa bullet height versus distance formula for a zeroed rifle: 
[Pejsa Bullet Height Versus Distance Formula](https://www.mathscinotes.com/2015/05/pejsa-bullet-height-versus-distance-formula-for-a-zeroed-rifle/). 
The data used for cubic spline interpolation to estimate the function \( F_0 \) is sourced from the same resource, 
based on *Modern Practical Ballistics* by Arthur J. Pejsa.

## Technology Stack

- **Vue.js**: JavaScript framework for building the user interface.
- **JavaScript**: Core logic and calculations.
- **HTML**: Structure and content rendering.
- **Tailwind CSS**: CSS framework for styling the application.

## Additional Dependencies

- **chart.js**: A JavaScript library for creating charts.
- **vue-chartjs**: A wrapper for using Chart.js with Vue.js.
- **vue-router**: Official Vue.js router for navigation and routing between views.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

The application should be run locally on port 5173 on URL:
http://localhost:5173

### Compile and Minify for Production

```sh
npm run build
```
