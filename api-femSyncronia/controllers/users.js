const users  = require('../models').users;
const bcrypt = require('bcrypt');

exports.store = async (req, res) => {
    try {
        const { birthdate, username, name, lastname, user_status, email, password, profile_image, phone, 
            when_your_period_came, recording_period, Have_symptoms, First_period, Affects_skin, Affects_weight,
            Affects_dream, Affects_energy, Affects_appetite, Affects_humour
          } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: 'El email ya está registrado.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 8); // 10 es el número de rondas de sal

        // Crear el usuario con el email y la contraseña hash
        const newUser = await users.create({
            email,
            name,
            lastname,
            password: hashedPassword,
            phone,
            profile_image,
            birthdate,
            username,
            user_status,
            when_your_period_came,
            recording_period,
            Have_symptoms,
            First_period,
            Affects_skin,
            Affects_weight,
            Affects_dream,
            Affects_energy,
            Affects_appetite,
            Affects_humour
        });

        return res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: 'Ocurrió un error al crear el usuario.', error });
    }
};

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

exports.show_email = async (req, res) => {
    const email = req.params.email; // Se obtiene el email de los parámetros

    const user = await users.findOne({
        where: {
            email: email // Busca directamente por el string
        }
    });

    if (user) {
        return res.status(200).send(user); // Devuelve el usuario si se encuentra
    } else {
        return res.status(404).send({ message: 'Usuario no encontrado' }); // Devuelve un mensaje si no se encuentra
    }
};

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
    if (req.body.name != null) updatedData['name']= req.body.name;
    if (req.body.lastname != null) updatedData['lastname']= req.body.lastname;
    if (req.body.phone != null) updatedData['phone']= req.body.phone;
    if (req.body.username != null) updatedData['username']= req.body.username;
    if (req.body.user_status != null) updatedData['user_status']= req.body.user_status;
    if (req.body.email != null) updatedData['email']= req.body.email;
    if (req.body.password != null) updatedData['password']= req.body.password;
    if (req.body.profile_image != null) updatedData['profile_image']= req.body.profile_image;
    if (req.body.when_your_period_came != null) updatedData['when_your_period_came']= req.body.when_your_period_came;
    if (req.body.recording_period != null) updatedData['recording_period']= req.body.recording_period;
    if (req.body.Have_symptoms != null ) updatedData['Have_symptoms']= req.body.Have_symptoms;
    if (req.body.Affects_skin != null ) updatedData['Affects_skin']= req.body.Affects_skin;
    if (req.body.Affects_weight != null ) updatedData['Affects_weight']= req.body.Affects_weight;
    if (req.body.Affects_dream != null ) updatedData['Affects_dream']= req.body.Affects_dream;
    if (req.body.Affects_energy != null ) updatedData['Affects_energy']= req.body.Affects_energy;
    if (req.body.Affects_appetite != null ) updatedData['Affects_appetite']= req.body.Affects_appetite;
    if (req.body.Affects_humour != null ) updatedData['Affects_humour']= req.body.Affects_humour;

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
