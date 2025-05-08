const cycles  = require('../models').cycles;
const { spawn } = require('child_process'); // Importar el módulo child_process
/*Nota importante:
    Los sintomas tienen una valoración del 0 al 5 en la base de datos
    Por cada sintoma se van a hacer 1 modelo con regresion lineal para predecir el valor de los sintomas
    

    0 = Sin sintoma
    1 = Leve
    2 = Moderado
    3 = Severo
    4 = Muy Severo
    5 = Máximo

*/


exports.store = async (req, res) => {
    const cycle = {
        user_id: req.body.user_id,
        cycle_status: req.body.cycle_status !== undefined ? req.body.cycle_status : 1, // Inicializa con 2 si no está definido
        weight: req.body.weight,
        temperature: req.body.temperature,
        date: req.body.date,
        DM_1: req.body.DM_1,
        DM_2: req.body.DM_2,
        DM_3: req.body.DM_3,
        DM_4: req.body.DM_4,
        DM_5: req.body.DM_5,
        DM_6: req.body.DM_6,
        DM_7: req.body.DM_7,
        DM_8: req.body.DM_8,
        DM_9: req.body.DM_9,
        DM_10: req.body.DM_10,
        DM_11: req.body.DM_11,
        DM_12: req.body.DM_12,
        DM_13: req.body.DM_13,
        DM_14: req.body.DM_14,
        DM_15: req.body.DM_15,
        DM_16: req.body.DM_16,
        DM_17: req.body.DM_17,
        DM_18: req.body.DM_18,
        M_1: req.body.M_1,
        M_2: req.body.M_2,
        M_3: req.body.M_3,
        M_4: req.body.M_4,
        M_5: req.body.M_5,
        M_6: req.body.M_6,
        M_7: req.body.M_7,
        M_8: req.body.M_8,
        M_9: req.body.M_9,
        M_10: req.body.M_10,
        M_11: req.body.M_11,
        M_12: req.body.M_12,
        M_13: req.body.M_13,
        M_14: req.body.M_14,
        M_15: req.body.M_15,
        M_16: req.body.M_16,
        M_17: req.body.M_17,
        M_18: req.body.M_18,
        M_19: req.body.M_19,
        M_20: req.body.M_20,
        PP_1: req.body.PP_1,
        PP_2: req.body.PP_2,
        PP_3: req.body.PP_3,
        PP_4: req.body.PP_4,
        PP_5: req.body.PP_5,
        E_1: req.body.E_1,
        E_2: req.body.E_2,
        E_3: req.body.E_3,
        E_4: req.body.E_4,
        E_5: req.body.E_5,
        E_6: req.body.E_6,
        E_7: req.body.E_7,
        E_8: req.body.E_8,
        E_9: req.body.E_9,
        E_10: req.body.E_10,
        E_11: req.body.E_11,
        E_12: req.body.E_12,
        E_13: req.body.E_13,
        E_14: req.body.E_14,
        E_15: req.body.E_15,
        E_16: req.body.E_16,
        E_17: req.body.E_17,
        E_18: req.body.E_18,
        E_19: req.body.E_19,
        E_20: req.body.E_20,
        E_21: req.body.E_21,
        F_1: req.body.F_1,
        F_2: req.body.F_2,
        F_3: req.body.F_3,
        F_4: req.body.F_4,
        F_5: req.body.F_5,
        F_6: req.body.F_6,
        F_7: req.body.F_7,
        F_8: req.body.F_8,
        F_9: req.body.F_9,
        F_10: req.body.F_10,
        F_11: req.body.F_11,
        F_12: req.body.F_12,
        F_13: req.body.F_13,
        F_14: req.body.F_14,
        F_15: req.body.F_15, //sangrado
        AS_1: req.body.AS_1,
        AS_2: req.body.AS_2,
        AS_3: req.body.AS_3,
        AS_4: req.body.AS_4,
        AS_5: req.body.AS_5,
        notes: req.body.notes
    }
    console.log(cycle);

    cycles.create(cycle).then(
        cycle => res.status(200).send(cycle)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.store_prediction = async (req, res) => {
    const cycle = {
        user_id: req.body.user_id,
        cycle_status: req.body.cycle_status !== undefined ? req.body.cycle_status : 2, // Inicializa con 2 si no está definido
        weight: req.body.weight,
        temperature: req.body.temperature,
        date: req.body.date,
        DM_1: req.body.DM_1,
        DM_2: req.body.DM_2,
        DM_3: req.body.DM_3,
        DM_4: req.body.DM_4,
        DM_5: req.body.DM_5,
        DM_6: req.body.DM_6,
        DM_7: req.body.DM_7,
        DM_8: req.body.DM_8,
        DM_9: req.body.DM_9,
        DM_10: req.body.DM_10,
        DM_11: req.body.DM_11,
        DM_12: req.body.DM_12,
        DM_13: req.body.DM_13,
        DM_14: req.body.DM_14,
        DM_15: req.body.DM_15,
        DM_16: req.body.DM_16,
        DM_17: req.body.DM_17,
        DM_18: req.body.DM_18,
        M_1: req.body.M_1,
        M_2: req.body.M_2,
        M_3: req.body.M_3,
        M_4: req.body.M_4,
        M_5: req.body.M_5,
        M_6: req.body.M_6,
        M_7: req.body.M_7,
        M_8: req.body.M_8,
        M_9: req.body.M_9,
        M_10: req.body.M_10,
        M_11: req.body.M_11,
        M_12: req.body.M_12,
        M_13: req.body.M_13,
        M_14: req.body.M_14,
        M_15: req.body.M_15,
        M_16: req.body.M_16,
        M_17: req.body.M_17,
        M_18: req.body.M_18,
        M_19: req.body.M_19,
        M_20: req.body.M_20,
        PP_1: req.body.PP_1,
        PP_2: req.body.PP_2,
        PP_3: req.body.PP_3,
        PP_4: req.body.PP_4,
        PP_5: req.body.PP_5,
        E_1: req.body.E_1,
        E_2: req.body.E_2,
        E_3: req.body.E_3,
        E_4: req.body.E_4,
        E_5: req.body.E_5,
        E_6: req.body.E_6,
        E_7: req.body.E_7,
        E_8: req.body.E_8,
        E_9: req.body.E_9,
        E_10: req.body.E_10,
        E_11: req.body.E_11,
        E_12: req.body.E_12,
        E_13: req.body.E_13,
        E_14: req.body.E_14,
        E_15: req.body.E_15,
        E_16: req.body.E_16,
        E_17: req.body.E_17,
        E_18: req.body.E_18,
        E_19: req.body.E_19,
        E_20: req.body.E_20,
        E_21: req.body.E_21,
        F_1: req.body.F_1,
        F_2: req.body.F_2,
        F_3: req.body.F_3,
        F_4: req.body.F_4,
        F_5: req.body.F_5,
        F_6: req.body.F_6,
        F_7: req.body.F_7,
        F_8: req.body.F_8,
        F_9: req.body.F_9,
        F_10: req.body.F_10,
        F_11: req.body.F_11,
        F_12: req.body.F_12,
        F_13: req.body.F_13,
        F_14: req.body.F_14,
        F_15: req.body.F_15,
        AS_1: req.body.AS_1,
        AS_2: req.body.AS_2,
        AS_3: req.body.AS_3,
        AS_4: req.body.AS_4,
        AS_5: req.body.AS_5,
        notes: req.body.notes
    };
    console.log(cycle);
};

exports.index = async (req, res) =>{
    return await cycles.findAll({

    }).then(
        cycles => res.status(200).send(cycles)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle = await cycles.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cycle);
}

exports.show_tablesid = async (req, res) => {
    const user_id = Number(req.params.user_id);
    console.log(user_id);

    // Validar el user_id
    if (isNaN(user_id) || user_id <= 0 || !Number.isInteger(user_id)) {
        return res.status(400).send({ message: 'Invalid user_id' });
    }

    try {
        // Obtener todos los ciclos con el mismo user_id
        const cyclesList = await cycles.findAll({
            where: { user_id: user_id },
            attributes: ['id', 'weight', 'temperature', 'cycle_status', 'date', 'DM_1', 'DM_2', 'DM_3', 'DM_4', 'DM_5', 'DM_6', 'DM_7', 'DM_8', 'DM_9',
                'DM_10', 'DM_11', 'DM_12', 'DM_13', 'DM_14', 'DM_15', 'DM_16', 'DM_17', 'DM_18',
                'M_1', 'M_2', 'M_3', 'M_4', 'M_5', 'M_6', 'M_7', 'M_8', 'M_9',
                'M_10', 'M_11', 'M_12', 'M_13', 'M_14', 'M_15', 'M_16', 'M_17', 'M_18', 'M_19',
                'M_20', 'PP_1', 'PP_2', 'PP_3', 'PP_4', 'PP_5',
                'E_1', 'E_2', 'E_3', 'E_4', 'E_5', 'E_6', 'E_7', 'E_8', 'E_9',
                'E_10', 'E_11', 'E_12', 'E_13', 'E_14', 'E_15', 'E_16', 'E_17', 'E_18',
                'E_19', 'E_20', 'E_21',
                'F_1', 'F_2', 'F_3', 'F_4', 'F_5', 'F_6', 'F_7', 'F_8', 'F_9',
                'F_10', 'F_11', 'F_12', 'F_13', 'F_14', 'F_15',
                'AS_1', 'AS_2', 'AS_3', 'AS_4', 'AS_5',
                'notes'
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
        return res.status(500).send({ message: 'Internal server error' });
    }
};


exports.show_tables = async (req, res) => {
    const user_id = parseInt(req.params.user_id); // Cambiar a user_id
    console.log(user_id);

    // Validar el user_id
    if (isNaN(user_id) || user_id <= 0 || !Number.isInteger(user_id)) {
        return res.status(400).send({ message: 'Invalid user_id' });
    }

    try {
        // Buscar ciclos por user_id
        const cyclesList = await cycles.findAll({
            where: {
                user_id: user_id
            },
            attributes: ['user_id', 'weight', 'temperature', 'cycle_status', 'date', 'DM_1', 'DM_2', 'DM_3', 'DM_4', 'DM_5', 'DM_6', 'DM_7', 'DM_8', 'DM_9',
                'DM_10', 'DM_11', 'DM_12', 'DM_13', 'DM_14', 'DM_15', 'DM_16', 'DM_17', 'DM_18',
                'M_1', 'M_2', 'M_3', 'M_4', 'M_5', 'M_6', 'M_7', 'M_8', 'M_9',
                'M_10', 'M_11', 'M_12', 'M_13', 'M_14', 'M_15', 'M_16', 'M_17', 'M_18', 'M_19',
                'M_20', 'PP_1', 'PP_2', 'PP_3', 'PP_4', 'PP_5',
                'E_1', 'E_2', 'E_3', 'E_4', 'E_5', 'E_6', 'E_7', 'E_8', 'E_9',
                'E_10', 'E_11', 'E_12', 'E_13', 'E_14', 'E_15', 'E_16', 'E_17', 'E_18',
                'E_19', 'E_20', 'E_21',
                'F_1', 'F_2', 'F_3', 'F_4', 'F_5', 'F_6', 'F_7', 'F_8', 'F_9',
                'F_10', 'F_11', 'F_12', 'F_13', 'F_14', 'F_15',
                'AS_1', 'AS_2', 'AS_3', 'AS_4', 'AS_5',
                'notes'] // Seleccionar campos específicos
        });

        if (!cyclesList || cyclesList.length === 0) {
            return res.status(404).send({ message: 'No cycles found for the given user_id' });
        }

        // Enviar la respuesta con los ciclos encontrados
        return res.status(200).send(cyclesList);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await cycles.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'data eliminado con éxito' });
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

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    let updatedData = {};

    if (req.body.cycle_status != null) updatedData['cycles_status']= req.body.cycle_status;
    if (req.body.weight != null) updatedData['weight']= req.body.weight;
    if (req.body.temperature != null) updatedData['temperature']= req.body.temperature;
    if (req.body.date != null) updatedData['date']= req.body.date;
    if (req.body.DM_1 != null) updatedData['DM_1']= req.body.DM_1;
    if (req.body.DM_2 != null) updatedData['DM_2']= req.body.DM_2;
    if (req.body.DM_3 != null) updatedData['DM_3']= req.body.DM_3;
    if (req.body.DM_4 != null) updatedData['DM_4']= req.body.DM_4;
    if (req.body.DM_5 != null) updatedData['DM_5']= req.body.DM_5;
    if (req.body.DM_6 != null) updatedData['DM_6']= req.body.DM_6;
    if (req.body.DM_7 != null) updatedData['DM_7']= req.body.DM_7;
    if (req.body.DM_8 != null) updatedData['DM_8']= req.body.DM_8;
    if (req.body.DM_9 != null) updatedData['DM_9']= req.body.DM_9;
    if (req.body.DM_10 != null) updatedData['DM_10']= req.body.DM_10;
    if (req.body.DM_11 != null) updatedData['DM_11']= req.body.DM_11;
    if (req.body.DM_12 != null) updatedData['DM_12']= req.body.DM_12;
    if (req.body.DM_13 != null) updatedData['DM_13']= req.body.DM_13;
    if (req.body.DM_14 != null) updatedData['DM_14']= req.body.DM_14;
    if (req.body.DM_15 != null) updatedData['DM_15']= req.body.DM_15;
    if (req.body.DM_16 != null) updatedData['DM_16']= req.body.DM_16;
    if (req.body.DM_17 != null) updatedData['DM_17']= req.body.DM_17;
    if (req.body.DM_18 != null) updatedData['DM_18']= req.body.DM_18;
    if (req.body.M_1 != null) updatedData['M_1']= req.body.M_1;
    if (req.body.M_2 != null) updatedData['M_2']= req.body.M_2;
    if (req.body.M_3 != null) updatedData['M_3']= req.body.M_3;
    if (req.body.M_4 != null) updatedData['M_4']= req.body.M_4;
    if (req.body.M_5 != null) updatedData['M_5']= req.body.M_5;
    if (req.body.M_6 != null) updatedData['M_6']= req.body.M_6;
    if (req.body.M_7 != null) updatedData['M_7']= req.body.M_7;
    if (req.body.M_8 != null) updatedData['M_8']= req.body.M_8;
    if (req.body.M_9 != null) updatedData['M_9']= req.body.M_9;
    if (req.body.M_10 != null) updatedData['M_10']= req.body.M_10;
    if (req.body.M_11 != null) updatedData['M_11']= req.body.M_11;
    if (req.body.M_12 != null) updatedData['M_12']= req.body.M_12;
    if (req.body.M_13 != null) updatedData['M_13']= req.body.M_13;
    if (req.body.M_14 != null) updatedData['M_14']= req.body.M_14;
    if (req.body.M_15 != null) updatedData['M_15']= req.body.M_15;
    if (req.body.M_16 != null) updatedData['M_16']= req.body.M_16;
    if (req.body.M_17 != null) updatedData['M_17']= req.body.M_17;
    if (req.body.M_18 != null) updatedData['M_18']= req.body.M_18;
    if (req.body.M_19 != null) updatedData['M_19']= req.body.M_19;
    if (req.body.M_20 != null) updatedData['M_20']= req.body.M_20;
    if (req.body.PP_1 != null) updatedData['PP_1']= req.body.PP_1;
    if (req.body.PP_2 != null) updatedData['PP_2']= req.body.PP_2;
    if (req.body.PP_3 != null) updatedData['PP_3']= req.body.PP_3;
    if (req.body.PP_4 != null) updatedData['PP_4']= req.body.PP_4;
    if (req.body.PP_5 != null) updatedData['PP_5']= req.body.PP_5;
    if (req.body.E_1 != null) updatedData['E_1']= req.body.E_1;
    if (req.body.E_2 != null) updatedData['E_2']= req.body.E_2;
    if (req.body.E_3 != null) updatedData['E_3']= req.body.E_3;
    if (req.body.E_4 != null) updatedData['E_4']= req.body.E_4;
    if (req.body.E_5 != null) updatedData['E_5']= req.body.E_5;
    if (req.body.E_6 != null) updatedData['E_6']= req.body.E_6;
    if (req.body.E_7 != null) updatedData['E_7']= req.body.E_7;
    if (req.body.E_8 != null) updatedData['E_8']= req.body.E_8;
    if (req.body.E_9 != null) updatedData['E_9']= req.body.E_9;
    if (req.body.E_10 != null) updatedData['E_10']= req.body.E_10;
    if (req.body.E_11 != null) updatedData['E_11']= req.body.E_11;
    if (req.body.E_12 != null) updatedData['E_12']= req.body.E_12;
    if (req.body.E_13 != null) updatedData['E_13']= req.body.E_13;
    if (req.body.E_14 != null) updatedData['E_14']= req.body.E_14;
    if (req.body.E_15 != null) updatedData['E_15']= req.body.E_15;
    if (req.body.E_16 != null) updatedData['E_16']= req.body.E_16;
    if (req.body.E_17 != null) updatedData['E_17']= req.body.E_17;
    if (req.body.E_18 != null) updatedData['E_18']= req.body.E_18;
    if (req.body.E_19 != null) updatedData['E_19']= req.body.E_19;
    if (req.body.E_20 != null) updatedData['E_20']= req.body.E_20;
    if (req.body.E_21 != null) updatedData['E_21']= req.body.E_21;
    if (req.body.F_1 != null) updatedData['F_1']= req.body.F_1;
    if (req.body.F_2 != null) updatedData['F_2']= req.body.F_2;
    if (req.body.F_3 != null) updatedData['F_3']= req.body.F_3;
    if (req.body.F_4 != null) updatedData['F_4']= req.body.F_4;
    if (req.body.F_5 != null) updatedData['F_5']= req.body.F_5;
    if (req.body.F_6 != null) updatedData['F_6']= req.body.F_6;
    if (req.body.F_7 != null) updatedData['F_7']= req.body.F_7;
    if (req.body.F_8 != null) updatedData['F_8']= req.body.F_8;
    if (req.body.F_9 != null) updatedData['F_9']= req.body.F_9;
    if (req.body.F_10 != null) updatedData['F_10']= req.body.F_10;
    if (req.body.F_11 != null) updatedData['F_11']= req.body.F_11;
    if (req.body.F_12 != null) updatedData['F_12']= req.body.F_12;
    if (req.body.F_13 != null) updatedData['F_13']= req.body.F_13;
    if (req.body.F_14 != null) updatedData['F_14']= req.body.F_14;
    if (req.body.F_15 != null) updatedData['F_15']= req.body.F_15;
    if (req.body.AS_1 != null) updatedData['AS_1']= req.body.AS_1;
    if (req.body.AS_2 != null) updatedData['AS_2']= req.body.AS_2;
    if (req.body.AS_3 != null) updatedData['AS_3']= req.body.AS_3;
    if (req.body.AS_4 != null) updatedData['AS_4']= req.body.AS_4;
    if (req.body.AS_5 != null) updatedData['AS_5']= req.body.AS_5;
    if (req.body.notes != null) updatedData['notes']= req.body.notes;
    
    return await cycles.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await cycles.findOne({where: {id}})
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