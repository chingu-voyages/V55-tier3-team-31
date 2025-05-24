export const getAllResources = async () => {
    try {
        const resourceRes = await fetch("https://seshatbe.up.railway.app/resources");
        if(!resourceRes.ok) {
            new Error("something went wrong")
        }
        return resourceRes.json();
    } catch(err) {
        console.log("Error", err);
    }
}

export const getAllTags = async () => {
    try {
        const tagsRes = await fetch("https://seshatbe.up.railway.app/tags");
        if(!tagsRes.ok) {
            new Error("something went wrong")
        }
        return tagsRes.json();
    } catch(err) {
        console.log("Error", err);
    }
}