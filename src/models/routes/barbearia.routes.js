const express = require('express');
const router = express.Router();
const barbearia = require('../barbearia');
const servicos = require('../servicos');
const turf = turf;
router.post('/', async (req, res) => {
    try {

        const barbearia = await new barbearia(req.body).save();
         res.json({barbearia});
    }catch (err) {
        res.json({ error: true, message: err.message})
    }
    
});

router.get('/servicos/:barbeariaid', async (req, res) => {
    try {
     const {barbeariaid} = req.params;
     const servicos = await  servicos.find({
        barbeariaid,
        status: 'A'
     }).selet('_id titulo');

    res.json({
        servicos: servicos.map(s => ({label: s.titulo, value: s._id})),
    });
    } catch (err) {

    }
})

router.get('/:id', async (req, res) => {
    try{
     const salao = await barbearia.findByid(req.params.id).select('capa nome endereco.cidade geo.coordinates telefone ')



     const distance = turf.distance(
        turf.point(barbearia.geo.coordinates),
        tur.point([-19.896971474616294, -44.03882683000432])
     );

     res.json({error: false, barbearia, distance});
    }catch (err) {
        res.json({error: true, message: err.message});
    }
})

module.exports = router;