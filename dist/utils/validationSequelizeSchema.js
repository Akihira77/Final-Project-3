export default function validationSequelizeSchema({ errors }) {
    return errors.map((err) => {
        return err.message;
    });
}
