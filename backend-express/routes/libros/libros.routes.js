const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Datos mock (simulan la base de datos)
const libros = [

  { id: 1,
     titulo: 'Cien años de soledad',
     autor: 'Gabriel García Márquez',
     anio: 1967,
     sinopsis:" La historia se desarrolla a lo largo de varias generaciones, mostrando la vida de los Buendía y su relación con el pueblo ficticio de Macondo. A través de sus personajes, la novela aborda temas como el amor, la soledad, el destino y la historia de América Latina.",
     precio: 9 ,
     imagen: "/covers/cien-anos-soledad.webp",
     tapa: "Tapa blanda",
     idioma: "es-ES",
     paginas: 417,
      editorial: "Editorial Sudamericana",
     estado: "Semi-Nuevo"
    },

  { id: 2, 
    titulo: 'La voz dormida',
    autor: 'Dulce Chacón',
    anio: 2002,
    sinopsis: "La novela se centra en la historia de varias mujeres que fueron encarceladas durante la Guerra Civil Española y el régimen franquista. A través de sus relatos, se exploran temas como la resistencia, la represión, el amor y la esperanza en tiempos difíciles.",
    precio: 12,
    imagen: "/covers/la-voz-dormida.webp",
    tapa: "Tapa dura",
    idioma: "es-ES",
    paginas: 320,
    editorial: "Editorial Planeta",
    estado: "Nuevo"
   },

  { id: 3, 
    titulo: 'La sombra del viento',
    autor: 'Carlos Ruiz Zafón',
    anio: 2001,
    sinopsis: "La historia sigue a Daniel Sempere, un joven que descubre un libro olvidado en el Cementerio de los Libros Olvidados. A medida que investiga sobre el autor del libro, se ve envuelto en una trama de misterio, amor y venganza que lo lleva a descubrir secretos oscuros del pasado.",
    precio: 10,
    imagen: "/covers/la-sombra-del-viento.webp",
    tapa: "Tapa dura",
    idioma: "es-ES",
    paginas: 487,
    editorial: "Editorial Planeta",
    estado: "Semi-Nuevo"
   },

  { id: 4, 
    titulo: 'Cometas en el cielo',
      autor: 'Khaled Hosseini',
      anio: 2003,
      sinopsis: "La novela narra la historia de Amir, un joven afgano que crece en Kabul durante los años 70. A través de su relación con su amigo Hassan, se exploran temas como la amistad, la traición, el perdón y la redención en el contexto de la guerra y el exilio.",
    precio: 10,
    imagen: "/covers/cometas-en-el-cielo.webp",
    tapa: "Tapa blanda",
    idioma: "es-ES",
    paginas: 371,
    editorial: "Editorial Salamandra",
    estado: "Nuevo"

   },

  { id: 5,
     titulo: 'La mano de Fátima',
      autor: 'Ildefonso Falcones',
      anio: 2009,
      sinopsis: "La novela se desarrolla en la España del siglo XVI, durante la época de la Reconquista. La historia sigue a Hernando, un joven cristiano que se enamora de una joven musulmana llamada Fátima. A través de su relación, se exploran temas como el amor prohibido, la intolerancia religiosa y la lucha por la libertad.",
     precio: 14,
      imagen: "/covers/la-mano-de-fatima.webp",
      tapa: "Tapa blanda",
      idioma: "es-ES",
      paginas: 600,
      editorial: "Editorial Grijalbo",
      estado: "Semi-Nuevo"

    },

  { id: 6, 
    titulo: 'Reina roja', 
    autor: 'Juan Gómez-Jurado',
    anio: 2018,
    sinopsis: "La novela sigue a Antonia Scott, una mujer con una mente brillante que se ve envuelta en una serie de crímenes y conspiraciones. A medida que investiga, se enfrenta a peligros y desafíos que ponen a prueba su inteligencia y habilidades para resolver el misterio.",
    precio: 14,
    imagen: "/covers/la-reina-roja.webp" ,
    tapa: "Tapa dura",
    idioma: "es-ES",
    paginas: 450,
    editorial: "Editorial Planeta",
    estado: "Nuevo"
    
  },

  { id: 7,
     titulo: 'La caída de los gigantes',
     autor: 'Ken Follett',
      anio: 2010,
      sinopsis: "La novela se desarrolla durante la Primera Guerra Mundial y sigue a varias familias de diferentes países. A través de sus historias, se exploran temas como el amor, la guerra, la política y la lucha por la justicia en un contexto histórico tumultuoso.",
     precio: 12,
      imagen: "/covers/la-caida-de-los-gigantes.webp",
      tapa: "Tapa blanda",
      idioma: "es-ES",
      paginas: 900,
      editorial: "Editorial Plaza & Janés",
      estado: "Semi-Nuevo"
     },

  { id: 8, 
    titulo: 'Heridas abiertas',
      autor: 'Gillian Flynn',
      anio: 2006,
      sinopsis: "La aclamada primera novela de Gillian Flynn, sigue a Camille Preaker, una periodista recién salida de un hospital psiquiátrico que regresa a su sofocante pueblo natal para cubrir el asesinato de dos niñas. Camille debe enfrentar a su fría y manipuladora madre, reviviendo traumas familiares y cicatrices del pasado mientras investiga los crímenes. Con giros inesperados y una narrativa oscura, 'Heridas abiertas' explora temas de violencia doméstica, relaciones tóxicas y la complejidad de la mente humana.",
     precio: 11,
      imagen: "/covers/heridas-abiertas.webp",
      tapa: "Tapa blanda",
      idioma: "es-ES",
      paginas: 400,
      editorial: "Editorial Roca",
      estado: "Nuevo"


    },

  { id: 9, 
    titulo: 'Dime quien soy',
      autor: 'Julia Navarro',
      anio: 2010,
      sinopsis: "La novela sigue la vida de Amelia Garayoa, una mujer que se ve envuelta en los eventos más importantes del siglo XX. A través de su historia, se exploran temas como el amor, la traición, la política y la lucha por la libertad en un contexto histórico lleno de cambios y desafíos.",
     precio: 14,
      imagen: "/covers/dime-quien-soy.webp",
      tapa: "Tapa dura",
      idioma: "es-ES",
      paginas: 700,
      editorial: "Editorial Plaza & Janés",
      estado: "Semi-Nuevo"

    },

  { id: 10,
     titulo: 'El hobbit', 
      autor: 'J.R.R. Tolkien',
      anio: 1937,
      sinopsis: "La novela sigue las aventuras de Bilbo Bolsón, un hobbit que se embarca en una peligrosa misión para recuperar un tesoro custodiado por el dragón Smaug. A lo largo de su viaje, Bilbo enfrenta desafíos, conoce a personajes fascinantes y descubre su propio valor y coraje.",
     precio: 12,
      imagen: "/covers/el-hobbit.webp",
      tapa: "Tapa blanda",
      idioma: "es-ES",
      paginas: 310,
      editorial: "Editorial Minotauro",
      estado: "Nuevo"
     },

  { id: 11, 
    titulo: 'Muerte en el Nilo',
    autor: 'Agatha Christie',
    anio: 1937,
    sinopsis: "La novela sigue al detective Hercule Poirot mientras investiga un asesinato a bordo de un barco de lujo en el río Nilo. A medida que Poirot interroga a los pasajeros, descubre secretos ocultos y motivaciones ocultas que lo llevan a resolver el misterio del asesinato.",
    precio: 8,
    imagen: "/covers/muerte-en-el-nilo.webp",
    tapa: "Tapa dura",
    idioma: "es-ES",
    paginas: 350,
    editorial: "Editorial Planeta",
    estado: "Semi-Nuevo"
   },

  { id: 12, 
    titulo: 'Los juegos del hambre',
    autor: 'Suzanne Collins',
    anio: 2008,
    sinopsis: "La novela se desarrolla en un futuro distópico donde los jóvenes son seleccionados para participar en un evento televisado llamado 'Los Juegos del Hambre', donde deben luchar hasta la muerte. La historia sigue a Katniss Everdeen, una joven que se ofrece como voluntaria para proteger a su hermana y se convierte en un símbolo de resistencia contra el régimen opresivo.",
     precio: 12,
      imagen: "/covers/los-juegos-del-hambre.webp",
      tapa: "Tapa blanda",
      idioma: "es-ES",
      paginas: 400,
      editorial: "Editorial Molino",
      estado: "Nuevo"
     }
];

router.get('/', (req, res) => {
  res.json(libros);
});


router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const libro = libros.find(l => l.id === id);

  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  res.json(libro);
});

router.post('/', (req, res) => {
  const nuevoLibro = {id: Date.now(),...req.body,};
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = libros.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  libros.splice(index, 1);
  res.json({ ok: true });
});

router.post('/upload', upload.single('imagen'), (req, res) => {
  const nuevoLibro = {
    id: Date.now(),
    ...req.body,
    imagen: req.file ? `/uploads/${req.file.filename}` : null,
  };
});

router.put('/:id', upload.single('imagen'), (req, res) => {
  const id = Number(req.params.id);
  const index = libros.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }

  const libroActualizado = {
    ...libros[index],
    ...req.body,
    imagen: req.file ? `/uploads/${req.file.filename}` : libros[index].imagen,
  };

  libros[index] = libroActualizado;
  res.json(libroActualizado);
});


module.exports = router;