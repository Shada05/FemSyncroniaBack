const cycle_calendars  = require('../models').cycle_calendars;
const { spawn } = require('child_process'); // Importar el módulo child_process
const { Op, fn, col, where } = require('sequelize');

exports.store = async (req, res) => {
    const cycle_calendar = {
        user_id:req.body.user_id,
        cycle_status: req.body.cycle_status,
        Start_day: req.body.Start_day,
        Finish_day: req.body.Finish_day,
        average_periodo: req.body.average_periodo, //duracion del ciclo mestrual
        average_ciclo: req.body.average_ciclo,  //duracion del ciclo
        average_mestruation: req.body.average_mestruation, //duracion de la menstruacion
        Regular_cycle: req.body.Regular_cycle
        
    }
    console.log(cycle_calendar);

    cycle_calendars.create(cycle_calendar).then(
        cycle_calendar => res.status(200).send(cycle_calendar)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await cycle_calendars.findAll({

    }).then(
        cycle_calendars => res.status(200).send(cycle_calendars)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle_calendar = await cycle_calendars.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cycle_calendar);
}

exports.destroy = async (req, res) => {
    const userId = parseInt(req.params.user_id);
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    if (isNaN(userId) || isNaN(year) || isNaN(month)) {
        return res.status(400).send({ message: 'Parámetros inválidos' });
    }

    try {
        const deleted = await cycle_calendars.destroy({
            where: {
                user_id: userId,
                [Op.and]: [
                    where(fn('MONTH', col('Start_day')), month),
                    where(fn('YEAR', col('Start_day')), year)
                ]
            }
        });

        if (deleted) {
            res.status(200).send({ message: 'Registro eliminado con éxito' });
        } else {
            res.status(404).send({ message: 'No se encontró ningún registro para eliminar' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};

exports.show_userid = async (req, res) => {
    const user_id = Number(req.params.user_id);
    console.log(user_id);

    // Validar el user_id
    if (isNaN(user_id) || user_id <= 0 || !Number.isInteger(user_id)) {
        return res.status(400).send({ message: 'Invalid user_id' });
    }

    try {
        // Obtener todos los ciclos con el mismo user_id
        const cyclesList = await cycle_calendars.findAll({
            where: { user_id: user_id },
            attributes: ['user_id', 'cycle_status', 'Start_day', 'Finish_day', 'average_periodo', 'average_ciclo', 'average_mestruation', 'Regular_cycle'
            ] // Puedes agregar más campos si lo deseas
        });

        if (cyclesList.length === 0) {
            return res.status(404).send({ message: 'No cycles found for the given user_id' });
        }

        // Llamar al script de Python y pasar el user_id como argumento
        const pythonProcess = spawn('python', ['../IA-Cycles/index.py', user_id]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Salida del script Python: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error en el script Python: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`El script Python terminó con código ${code}`);
            // Enviar la respuesta con todos los ciclos encontrados
            return res.status(200).send(cyclesList);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error', error: error.message  });
    }
};


exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    let updatedData = {};

    if (req.body.cycle_status != null) updatedData['cycle_status']= req.body.cycle_status;
    if (req.body.Start_day != null) updatedData['Start_day']= req.body.weigth;
    if (req.body.Finish_day != null) updatedData['Finish_day']= req.body.Finish_day;
    if (req.body.average_periodo != null) updatedData['average_periodo']= req.body.average_periodo;
    if (req.body.average_ciclo != null) updatedData['average_ciclo']= req.body.average_ciclo;
    if (req.body.average_mestruation != null) updatedData['average_mestruation']= req.body.average_mestruation;
    if (req.body.Regular_cycle != null) updatedData['Regular_cycle']= req.body.Regular_cycle;
    return await cycle_calendars.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await cycle_calendars.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: userUpd });
            } else {
                res.status(404).send({ message: 'data no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};
exports.update_Start_day = async (req, res) => {
    const id = parseInt(req.params.id);
    let updatedData = {};

    if (req.body.cycle_status != null) updatedData['cycle_status'] = req.body.cycle_status;

    // Si se proporciona Start_day, calcular Finish_day
    if (req.body.Start_day != null) {
        const startDate = new Date(req.body.Start_day);
        updatedData['Start_day'] = startDate;

        // Sumar 24 días al Start_day
        const finishDate = new Date(startDate);
        finishDate.setDate(finishDate.getDate() + 24);
        updatedData['Finish_day'] = finishDate;
    }

    // Si Finish_day también viene explícitamente, sobrescribirá lo anterior
    if (req.body.Finish_day != null) {
        updatedData['Finish_day'] = new Date(req.body.Finish_day);
    }
    try {
        const [updated] = await cycle_calendars.update(updatedData, {
            where: { id: id }
        });

        const userUpd = await cycle_calendars.findOne({ where: { id } });

        if (updated) {
            res.status(200).send({ data: userUpd });
        } else {
            res.status(404).send({ message: 'data no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
