exports.up = async function(db) {
    return db.runSql(`
        CREATE TABLE IF NOT EXISTS roles (
            id varchar(36) primary key,
            role varchar(100) not null,
            unique(role)
        );
        
        INSERT INTO roles VALUES 
        ('91e746f4-38aa-46bb-b890-70d6923b9b4d', 'admin'),
        ('a1808186-5239-4419-9f6f-45a52fb16efe', 'user')
    `);
};

exports.down = async function(db) {
    return db.runSql(`
        DROP TABLE IF EXISTS roles;
    `);
};
