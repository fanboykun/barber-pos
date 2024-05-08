export const createGradientAvatar = () => {
    const getRandomColor = () => {
        const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "magenta"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 100;
    canvas.height = 100;

    const gradient = ctx.createLinearGradient(0, 0, 100, 100);
    gradient.addColorStop(1, getRandomColor());
    gradient.addColorStop(0.5, getRandomColor());
    gradient.addColorStop(0, getRandomColor());

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);
    return canvas.toDataURL();
}

export const getFistCharFromName = (name: string|undefined) => {
    const defaultChar = 'O'
    if(name == undefined) return defaultChar
    try {
        const splitted = name.split(' ')
        const first = splitted.at(0)?.charAt(0).toUpperCase()
        const second = splitted.at(1)?.charAt(0).toUpperCase()
        if(splitted.length >= 2) return `${first}${second}`
        return first
    } catch(err) {
        return defaultChar
    }
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}