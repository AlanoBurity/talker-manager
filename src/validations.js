const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (email === '' || !email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.includes('@') || !email.includes('.com')) {
         return res.status(400)
         .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (password === '' || !password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
         return res.status(400)
         .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (name === '' || !name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (age === '' || !age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (talk === '' || !talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === '' || !rate) {
         return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }

    next();
};

const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (watchedAt === '' || !watchedAt) {
        return (
            res.status(400).json(
                { message: 'O campo "watchedAt" é obrigatório' },
                )
            );
    } 
    const regex = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
    if (!regex.test(watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
);
    }  

    next();
};

const validateToken = (req, res, next) => {
    const token = req.get('authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};
module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    validateWatchedAt,
    validateToken,
};