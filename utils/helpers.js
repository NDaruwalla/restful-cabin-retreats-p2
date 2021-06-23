const helpers = {
    truncText: (string, symbolsCount) => {
        if (string.length <= symbolsCount) {
            return string;
        }

        return string.slice(0, symbolsCount) + '...';
    }
};

module.exports = helpers;