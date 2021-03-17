// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  checkContext,
  getItems,
  replaceItems,
} = require("feathers-hooks-common");
const AWS = require("aws-sdk");

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, [
      "find",
      "get",
      "create",
      "update",
      "patch",
      "remove",
    ]);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    if (records.type !== "sms") return context;
    switch (records.typeNotification) {
      case "buyShop":
        console.log("buyShop");
        console.log(records.phone);
        var params = {
          Message: `Tienes un nuevo pedido en tu tienda de esnaqui.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        var paramsMe = {
          Message: `Hicieron un nuevo pedido en esnaqui.`,
          PhoneNumber: `${57}${3008559528}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(paramsMe)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "buyShopUser":
        console.log("buyShopUser");
        console.log(records.phone);
        var params = {
          Message: `Tu pedido en ${records.shop_name} se ha realizado correctamente ID ${records.id}.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "orderAcepted":
        var params = {
          Message: `Tu pedido ha sido aceptado en la tienda ${records.shop.name} y pronto sera enviado. ID ${records.id}.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "orderSend":
        var params = {
          Message: `La tienda ${records.shop.name} ha enviado tu pedido. ID ${records.id} `,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "orderDelivered":
        var params = {
          Message: `Hemos entregado el pedido No. ${records.id} que realizaste en ${records.shop.name}.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "orderRejected":
        var params = {
          Message: `Tu pedido No. ${records.id} en ${records.shop.name} ha sido rechazado.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "recoveryPassword":
        var params = {
          Message: `Codigo ${records.token}. este codigo te sirve para recuperar tu contrasena en tu cuenta de esnaqui`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      case "newShop":
        var params = {
          Message: `Ahora haces parte de esnaqui, en https://admin.esnaqui.com puedes administrar tu tienda. entra con tu telefono y contraseña`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

        case "tokenValidation":
        var params = {
          Message: `Codigo ${records.token}, este codigo te sirve para registrarte en esnaqui. pegalo en el formulario.`,
          PhoneNumber: `${57}${records.phone}`,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Esnaqui",
            },
            "AWS.SNS.SMS.SMSType": {
              DataType: "String",
              StringValue: "Transactional",
            },
          },
        };

        var publishTextPromise = new AWS.SNS({
          apiVersion: "2010-03-31",
          region: "us-east-1",
        })
          .publish(params)
          .promise();

        await publishTextPromise
          .then((data) => {
            console.log({ MessageID: data.MessageId });
          })
          .catch((err) => {
            console.log({ Error: err });
          });

        break;

      default:
        break;
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
