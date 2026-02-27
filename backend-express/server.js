const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const ventasRoutes = require('./routes/ventas.routes');
app.use('/api/proyecto5/ventas', ventasRoutes);

const librosRoutes = require('./routes/libros/libros.routes');
app.use('/api/proyecto5/react', librosRoutes);

app.use('/api/proyecto5/angular', librosRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});