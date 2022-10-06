const validateEmailAndPassword = (req, res, next) => {
    const regex = /\S+@\S+\.\S+/;
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!regex.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
}; 

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateFieldTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const validateWatchedAt = (req, res, next) => {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    const { watchedAt } = req.body.talk;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!regexData.test(watchedAt)) {
        return res.status(400).json({ message:
             'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next(); 
};

const validateRate = (req, res, next) => {
    const { rate } = req.body.talk;
    if (!rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!(rate >= 1 && rate <= 5)) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = {
    validateEmailAndPassword,
    validateToken,
    validateName,
    validateAge,
    validateFieldTalk,
    validateWatchedAt,
    validateRate,
};

// Referência: https://bobbyhadz.com/blog/javascript-date-validation-dd-mm-yyyy