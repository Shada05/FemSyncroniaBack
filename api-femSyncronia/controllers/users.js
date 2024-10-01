const users  = require('../models').users;

exports.store = async (req, res) => {
    const user = {
        birthdate: req.body.birthdate,
        username: req.body.username,
        user_status: req.body.user_status,
        email: req.body.email,
        password: req.body.password,
        profile_image: req.body.profile_image,
        phone: req.body.phone
    }
    console.log(user);

    users.create(user).then(
        user => res.status(200).send(user)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await users.findAll({

    }).then(
        users => res.status(200).send(users)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);



    const user = await users.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(user);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await users.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'Usuario eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
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

    if (req.body.birthdate != null) updatedData['birthdate']= req.body.birthdate;
    if (req.body.username != null) updatedData['username']= req.body.username;
    if (req.body.user_status != null) updatedData['user_status']= req.body.user_status;
    if (req.body.email != null) updatedData['email']= req.body.email;
    if (req.body.password != null) updatedData['password']= req.body.password;


    return await users.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await users.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: userUpd });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};