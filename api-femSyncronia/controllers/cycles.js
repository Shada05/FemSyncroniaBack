const cycles  = require('../models').cycles;

/*Nota importante:
    Los sintomas tienen una valoración del 0 al 5 en la base de datos
    0 = Ausente
    1 = Leve
    2 = Moderado
    3 = Severo
    4 = Muy Severo
    5 = Máximo

*/


exports.store = async (req, res) => {
    const cycle = {
        user_id: req.body.user_id,
        cycle_status: req.body.cycle_status,
        weight: req.body.weight,
        temperature: req.body.temperature,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
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
        AS_5: req.body.AS_5
    }
    console.log(cycle);

    cycles.create(cycle).then(
        cycle => res.status(200).send(cycle)
    ).catch(
        error => res.status(400).send(error)
    );
}

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
    if (req.body.weight != null) updatedData['weight']= req.body.weigth;
    if (req.body.temperature != null) updatedData['temperature']= req.body.temperature;
    if (req.body.start_date != null) updatedData['start_date']= req.body.start_date;
    if (req.body.end_date != null) updatedData['end_date']= req.body.end_date;
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