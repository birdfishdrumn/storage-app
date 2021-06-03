import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { searchReview } from 'algolia/algolia';
// import { TextInput } from "components/UI/index";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { push } from 'connected-react-router';
import { Products } from 'types/products';
import { Boxes } from 'types/box';
import { SearchBoxWrapper, SearchResult } from './style';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      position: 'absolute',
      overflow: 'auto',
      top: 60,
      paddingBottom: 0,
      paddingTop: 0,
      maxHeight: 300,
      cursor: 'pointer',
      zIndex: 100,
      boxShadow: '0 0px 10px rgba(0,1,1,0.5)',
      borderRadius: '5px',
    },
    searchText: {
      '&:hover': {
        background: '#eee',
      },
    },
    bar: {
      borderRadius: '40px',
      width: '500px',
      background: 'white',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        maxWidth: '300px !important',
        //  width:"100%",

        margin: '0 auto',
      },
    },
    label: {
      zIndex: 1,
      padding: '0 20px 5px 20px',
    },
    input: {
      color: '#eee',
    },
    headerMenu: {
      display: 'flex',
    },
    searchField: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: '50px',
      width: 500,
      margin: '0 auto',
      // background:"#eee",

      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        width: '90%',
        margin: '0 auto',
      },
    },
  })
);

interface PROPS {
  box?: boolean;
}

const SearchBox: React.FC<PROPS> = ({ box }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>('');
  const [search, setSearch] = useState<any[]>([]);

  const inputKeyword = async (event: any) => {
    setKeyword(event.target.value);
    if (!event.target.value) {
      setSearch([]);
    } else {
      const result = await searchReview(event.target.value);
      if (result.hits.length > 0) {
        const search = result.hits.map((hit: any) => {
          return hit;
        });
        setSearch(search);
        //  setSearch([]);
      } else {
        setSearch([]);
      }
    }
    document.addEventListener('click', (e) => {
      setSearch([]);
      document.removeEventListener('click', inputKeyword);
    });
  };

  const changePage = (id: string): void => {
    dispatch(push(`/product/${id}`));
    setSearch([]);
  };

  const changeBoxPage = (id: string): void => {
    dispatch(push(`/box/${id}`));
    setSearch([]);
  };

  return (
    <>
      <SearchBoxWrapper>
        <div className={classes.searchField}>
          <FormControl>
            <InputLabel className={classes.label}>キーワードを入力</InputLabel>
            <OutlinedInput
              id="input"
              value={keyword}
              type="search"
              onChange={inputKeyword}
              fullWidth={true}
              className={classes.bar}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
        <SearchResult>
          {search.length > 0 && (
            <List className={classes.root}>
              {box
                ? search.map(
                    (item: Boxes) =>
                      item.placeId && (
                        <>
                          <ListItem
                            className={classes.searchText}
                            onClick={() => changeBoxPage(item.id)}
                          >
                            <ListItemText primary={item.name} />
                            {item.images && <img src={item.images[0].path} width={50} />}
                          </ListItem>
                          <Divider component="li" />
                        </>
                      )
                  )
                : search.map(
                    (item: Products) =>
                      !item.placeId && (
                        <>
                          <ListItem
                            className={classes.searchText}
                            onClick={() => changePage(item.id)}
                          >
                            <ListItemText primary={item.name} />
                            {item.images && <img src={item.images[0].path} width={50} />}
                          </ListItem>
                          <Divider component="li" />
                        </>
                      )
                  )}
            </List>
          )}
        </SearchResult>
      </SearchBoxWrapper>
    </>
  );
};

export default SearchBox;
