module.exports = class UserDto
{
    id;
    email;
    full_name;
    nickname;
    is_activated;
    image;

    constructor(model)
    {
        this.id = model.id;
        this.email = model.email;
        this.is_activated = model.is_activated;
        this.full_name = model.full_name;
        this.nickname = model.nickname;
        this.image = model.image;
    }
}