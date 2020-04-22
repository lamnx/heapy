exports.up = async function(db) {
    return db.runSql(`
        CREATE TABLE IF NOT EXISTS users (
            id serial primary key,
            username varchar(100) not null,
            password varchar(255) not null,
            email varchar(150) not null,
            "roleId" varchar(36) references roles(id),
            "isActive" boolean not null default false,
            "updatedAt" timestamptz,
            "createdAt" timestamptz default CURRENT_TIMESTAMP,
            unique(username, email)
        );
    `);
};

exports.down = async function(db) {
    return db.runSql(`
        DROP TABLE ID EXISTS users;
    `);
};
