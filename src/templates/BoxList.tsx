import React, { useEffect, useState, useCallback } from 'react';
import { SectionWrapper, Title, GridList, BoldText, MinText,IconFlex } from 'style/GlobalStyle';
import { dialogOpenAction } from 'reducks/dialogSlice';

import { useDispatch } from 'react-redux';
import { FloatingActionButton, RadioGroupe,SelectBox } from 'components/UI/index';
import { db } from 'firebase/index';
import { Boxes } from 'types/box';
import { BoxCard } from 'components/Product/index';
import { boxData } from 'components/Product/data';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconButton from '@material-ui/core/IconButton';
import GridOnIcon from '@material-ui/icons/GridOn';
import ViewListIcon from '@material-ui/icons/ViewList';
import { usePlaceList } from "fooks/getPlace"
import { BoxListItem } from "components/Product/index"
import { snackbarOpenAction } from 'reducks/snackbarSlice';

interface PROPS {
  id: string;
}

const BoxesList: React.FC<PROPS> = ({ id }) => {
  // let id = window.location.pathname.split('/place')[1];

  // if (id) {
  //   id = id.split('/')[1];
  // }
  // console.log(id);

  const dispatch = useDispatch();
  const [boxes, setBoxes] = useState<Boxes[]>([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [boxArray, setBoxArray] = useState<string[]>([])
  const [move, setMove] = useState<boolean>(false)
  const [deleteBox, setDeleteBox] = useState<boolean>(false)
  const [place, setPlace] = useState<string>('');
    const [list, setList] = useState<boolean>(false);

    const {places} = usePlaceList()

  let query = selectedValue
    ? db.collection('boxes').where('placeId', '==', id).where('boxType', '==', selectedValue)
    : db.collection('boxes').where('placeId', '==', id);
  useEffect(() => {
    const unSub = query.onSnapshot((snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push(data);
      });
      setBoxes(list);
    });
    return () => {
      unSub();
    };
  }, [selectedValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    },
    [setSelectedValue]
  );

  console.log(boxArray)

  // const idArray = ["cbZpQ5thnxkE2VI7SFFp","5OGwJrZfUPCpkKiycQWN"]

  const deleteBoxAction = ():void => {
    boxArray.forEach((i) => {
      db.collection("boxes").doc(i).delete().then(() => {
           dispatch(snackbarOpenAction({ text: `箱を削除しました!`, type: true }))
    })
    })
  }

    const moveBoxAction = (place:string):void => {
    boxArray.forEach((i) => {
      db.collection("boxes").doc(i).update({
        placeId:place
      }).then(() => {
     dispatch(snackbarOpenAction({ text: `箱を移動しました`, type: true }))
    })
    })
   }
  return (
    <SectionWrapper>
      <Title>{id}の箱</Title>
      {/* <button onClick={()=>deleteBox()}>delete</button> */}
      <IconFlex>
        <div>

          <MinText onClick={() => setMove(!move)}>箱を移動</MinText>
          {move &&
            <>
                <SelectBox
            label={'保管場所'}
            required={true}
            options={places}
            select={setPlace}
            value={place}
            move
            />
            {place &&
               <IconButton onClick={() =>moveBoxAction(place)} >
        <LocalShippingIcon style={{fontSize:"30px"}}/>
      </IconButton>
            }

         </>
       }
        </div>
        <div>
          <MinText onClick={() => setDeleteBox(!deleteBox)}>箱を削除</MinText>
            {deleteBox &&
            <IconButton onClick={() => deleteBoxAction()}>
        <DeleteIcon style={{fontSize:"30px"}}/>
      </IconButton>
          }
        </div>
        <div>
              <IconButton onClick={() => setList(false)}>
        <GridOnIcon />
      </IconButton>
      <IconButton onClick={() => setList(true)}>
        <ViewListIcon />
      </IconButton>
        </div>

        </IconFlex>


      <RadioGroupe
        data={boxData}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        handleChange={handleChange}
      />
      <div className="module-spacer--medium" />
      {list ? (

          boxes.length && boxes.map((box) => (
            <BoxListItem
              boxes={box}
                boxArray={boxArray}
                setBoxArray={setBoxArray}
                move={move}
                deleteBox={deleteBox}
            />
        ))
      ) : (
        <GridList>

          {boxes.length ? (
            boxes.map((box) => (
              <BoxCard
                key={box.id}
                boxes={box}
                name={box.name}
                id={box.id}
                images={box.images}
                placeId={id}
                boxArray={boxArray}
                setBoxArray={setBoxArray}
                move={move}
                deleteBox={deleteBox}
              />
            ))
          ) : (
            <></>
          )}
        </GridList>
      )}
      {!boxes.length && <BoldText>登録された作品はまだありません。</BoldText>}

      <FloatingActionButton type="箱" name="箱登録" placeId={id} />
    </SectionWrapper>
  );
};

export default BoxesList;
