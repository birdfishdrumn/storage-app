const functions = require('firebase-functions');
// import algoliasearch from "algoliasearch"
const algoliasearch = require('algoliasearch');


const admin = require('firebase-admin');
admin.initializeApp();

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const index = client.initIndex('storage');

exports.onWriteProducts = functions
  .region('asia-northeast1')
  .firestore.document('products/{productsId}')
  .onWrite((change: any, context: any) => {
    const { productsId } = context.params;
    const products = change.after.data();
    const oldData = change.before.data();
    try {
      if (!!products) {
        index.saveObject({
          objectID: productsId,
          ...products,
        });
      } else if (!!oldData) {
        index.deleteObject(productsId);
      }
    } catch (err) {
      console.log(err);
    }
  });

exports.onWriteBoxes = functions
  .region('asia-northeast1')
  .firestore.document('boxes/{boxesId}')
  .onCreate(async(change: any, context: any) => {
    const { boxesId } = context.params;
    const boxes = change.after.data();
    const oldData = change.before.data();
      const db = admin.firestore();

    try {
      if (!!boxes) {
        index.saveObject({
          objectID: boxesId,
          ...boxes,
        });

        const id = db.collection("chat").doc().id

        db.collection("chat").doc(id).set({
          title: `${boxes.placeId}に箱の追加`,
          subtitle: `${boxes.name}を追加しました！`,
          avatar: boxes.images[0].path,
          date: new Date(),
          id: boxes.id,
          type:"add"
        })
      } else if (!!oldData) {
        index.deleteObject(boxesId);
      }
    } catch (err) {
      console.log(err);
    }
  });
exports.onUpdateBoxes = functions
  .region('asia-northeast1')
  .firestore.document('boxes/{boxesId}')
  .onUpdate(async(change: any, context: any) => {
    // const { boxesId } = context.params;
    const boxes = change.after.data();
    const oldData = change.before.data();
    const db = admin.firestore();
    const flag = boxes.placeId === oldData.placeId

    try {
      if (!!boxes) {

        const id = db.collection("chat").doc().id

        if (flag) {
               db.collection("chat").doc(id).set({
          title: `箱の編集`,
          subtitle: `${boxes.name}を編集しました！`,
          avatar: boxes.images[0].path,
          date: new Date(),
          id: boxes.id,
          type:"add"
        })
        } else {
               db.collection("chat").doc(id).set({
          title: `箱の移動`,
          subtitle: `${boxes.name}を${oldData.placeId}から${boxes.placeId}に移動しました！`,
          avatar: boxes.images[0].path,
          date: new Date(),
          id: boxes.id,
          type:"add"
        })
       }


      }
    } catch (err) {
      console.log(err);
    }
  });

exports.onDeleteBox = functions
  .region('asia-northeast1')
  .firestore.document('boxes/{boxesId}')
  .onDelete(async (snap: any, context: any) => {
    const deletedDocument = snap.data();
    if (!deletedDocument) {
      return;
    }
    const { boxesId } = context.params;
    const firebaseTools = require('firebase-tools');
    // const db = admin.firestore();
    // const batch = db.batch();
    try {
      await firebaseTools.firestore.delete(`boxes/${boxesId}/boxProduct`, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
      });


    } catch (err) {
      console.error(err);
    }
  });

  //  exports.onPushComment = functions
//   .region("asia-northeast1")
//   .firestore
//     .document("posts/{postId}/comments/{commentId}")
//    .onWrite((async (change, context) => {
//
//       const { commentId } = context.params
//      const comment = change.after.data()
//      const comUid = comment.id
//      console.log(comment)
//     //  コメントしたユーザーの情報を取得
//       const username = comment.username
//      const userAvatar = comment.avatar
//      const postId = comment.postId
//     //  コメントした作品のデータ
//      const postData = await db.collection("posts").doc(postId).get().then((snapshot) => {
//        const data = snapshot.data()
//        console.log(data)
//        return {
//          uid: data.uid,
//          image: data.images[0].path
//        }

//      })
//      const postUid = postData.uid
//        const postImage = postData.image
//      try {
//         const userRef = db.collection("users").doc(postUid)
//        const id = userRef.collection("message").doc().id
//        if (comUid !== postUid) {
//          userRef.collection("message").doc(id).set({
//            message: `${username}があなたの作品にコメントしました`,
//            id: id,
//            timeLimit: 7,
//            createdAt: admin.firestore.FieldValue.serverTimestamp(),
//            // username: username,
//            avatar: userAvatar,
//            image: postImage,
//            postId: postId
//          })
//        }
//      } catch (err) {
//        console.log(err)
//       }
//    }))
