document.querySelectorAll("*").forEach(el => {
    el.classList.forEach(cls => {
        if (!cls.startsWith("bg-")) return;

        let color = null;

        if (cls.startsWith("bg-[")) {
            color = cls.slice(4, -1); // remove bg-[ and ]
        } else {
            color = cls.slice(3); // remove bg-
        }

        el.style.backgroundColor = color;

        // match m-[...], mt-[...], px-[...], etc.
        const match = cls.match(/^(m|p)(t|b|l|r|x|y)?-\[(.+)\]$/);
        if (!match) return;

        const type = match[1];      // m | p
        const dir = match[2] || ""; // t b l r x y or empty
        const value = match[3];     // any unit

        const base = type === "m" ? "margin" : "padding";

        switch (dir) {
            case "":
                el.style[base] = value;
                break;
            case "t":
                el.style[base + "Top"] = value;
                break;
            case "b":
                el.style[base + "Bottom"] = value;
                break;
            case "l":
                el.style[base + "Left"] = value;
                break;
            case "r":
                el.style[base + "Right"] = value;
                break;
            case "x":
                el.style[base + "Left"] = value;
                el.style[base + "Right"] = value;
                break;
            case "y":
                el.style[base + "Top"] = value;
                el.style[base + "Bottom"] = value;
                break;
        }

    });
});
