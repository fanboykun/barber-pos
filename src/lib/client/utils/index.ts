/* eslint-disable @typescript-eslint/no-explicit-any */

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

/** Do not use this, since all value from formData will be converted to string no matter what the initial value was */
export function formDataToObject(formData: FormData): { [key: string]: FormDataEntryValue | FormDataEntryValue[] } {
    const obj: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } = {};

    formData.forEach((value, key) => {
        console.log(typeof value)
        // If the key already exists, convert the value to an array (if not already)
        if (key in obj) {
            // If it's already an array, just push the new value
            if (Array.isArray(obj[key])) {
                (obj[key] as FormDataEntryValue[]).push(value);
            } else {
                // If it's not an array, convert it to an array
                obj[key] = [obj[key] as FormDataEntryValue, value];
            }
        } else {
            // If the key doesn't exist, just assign the value
            obj[key] = value;
        }
    });

    return obj;
}

export const formatCurrency = (data: number|null|undefined) => {
    return data?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })?.split(',')?.at(0) ?? 'Rp 0'
}

export const formatDay = (date: Date) => {
    return date.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
}

export const formatTime = (date: Date) => {
    return date.toLocaleString('id-ID', { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' }).replace('.', ':')
}
