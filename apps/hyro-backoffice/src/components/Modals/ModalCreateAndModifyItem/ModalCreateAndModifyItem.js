import React, { useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { sizesOutfitsType, sizesShoesType } from 'lib-enums';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

import {
  addItemsPicture,
  createItem,
  getItemsPictures,
  removeItemsPicture,
  updateItem,
  updateItemPlace,
} from '../../../actions/items';
import { translation } from '../../../../../../libs/translations';
import Dropdown from '../../Dropdown/Dropdown';
import * as theme from '../../../styles/theme';
import { Button } from '../../Button';
import Spinner from '../../Spinner/Spinner';
import { imagesLinks, removeNullInObject } from '../../../utils';
import IconAndLabel from '../../IconAndLabel/IconAndLabel';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 0 40px;

  h4 {
    margin: 0;
  }

  img {
    height: 16px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 40px;

  h6 {
    margin-bottom: 10px;
  }
`;

const PinsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPin = styled.div`
  width: fit-content;
  background-color: ${theme.colors.graySoft};
  border-radius: 35px;
  padding: 10px 25px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 10px;

  img {
    height: 9px;
    cursor: pointer;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
  border: none;
  border-bottom: 1px solid ${(props) => (props.error ? theme.colors.red : theme.colors.grayBorder)};
  width: 100%;
  height: 34px;
  outline: none;
`;

const UploadLittle = styled.div`
  width: 160px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid ${theme.colors.grayDark};
  background-color: ${theme.colors.grayLight};
  cursor: pointer;

  img {
    height: 18px;
  }

  span {
    margin-top: 10px;
    font-size: 12px;
    color: ${theme.colors.gray};
  }
`;

const LayoutPictures = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PictureContainer = styled.div`
  width: 160px;
  height: 130px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .option-picture {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.grayTransparent};
  }
  &:hover {
    .option-picture {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Pin = ({ content, onClose }) => {
  return (
    <StyledPin>
      {content} <img src={'/x.svg'} alt={'cross'} onClick={onClose} />
    </StyledPin>
  );
};

const ModalCreateAndModifyItem = ({ hack, item, itemsLength, handleClose }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [place, setPlace] = useState(item?.place || itemsLength);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [newItem, setNewItem] = useState(item);

  const [pictures, setPictures] = useState([]);
  const [picturesToDelete, setPicturesToDelete] = useState([]);

  const isModify = !!item?._id;

  useMemo(() => {
    getItemsPictures(item?._id).then(({ response: pictures }) => setPictures(pictures));
    setCategories(item?.categories || []);
    setBrands(item?.brands || []);
    setSizes(item?.sizes || []);
    setColors(item?.colors || []);
  }, [item]);

  const uploadPicture = (event) => {
    const allowedFileTypes = ['jpeg', 'jpg', 'png'];
    const errosEnum = {
      bad_extention: 'bad_extention',
      size_too_large: 'size_too_large',
    };

    if (event.target.files && event.target.files?.length) {
      const file = event.target.files[0];

      const newFile = {
        name: file.name,
        path: file,
        new: true,
      };

      let error = false;
      const fileExtension = file.name.split('.').at(-1);
      if (!allowedFileTypes.includes(fileExtension)) error = errosEnum.bad_extention;
      if (file.size > 10e6) error = errosEnum.size_too_large;

      if (error === errosEnum.bad_extention) {
        alert(`Les extensions autorisées sont ${allowedFileTypes.join(', ')}`);
      } else if (error === errosEnum.size_too_large) {
        alert('10 MB maximum par image');
      } else {
        setPictures([...pictures, newFile]);
      }
    }
  };

  const update = async () => {
    if (!isLoading) {
      setIsLoading(true);
      for await (const picToDel of picturesToDelete) {
        await removeItemsPicture(item._id, picToDel);
      }

      if (item._id) {
        dispatch(
          updateItem(item._id, {
            title: newItem?.title,
            reference: newItem?.reference,
            price: parseInt(newItem?.price, 10),
            rental_price: parseInt(newItem?.rental_price, 10),
            commentary: newItem?.commentary,
            related_items: newItem?.related_items || '',
            categories,
            brands,
            sizes,
            colors,
          }),
        )
          .then(async () => {
            const picturesToUpload = pictures?.filter((p) => !p._id);
            for await (const pic of picturesToUpload) {
              const body = new FormData();
              body.append('file', pic.path);
              await addItemsPicture(item._id, body);
            }
            setIsLoading(false);
            toast.success('Article modifié');
            if (item?.place !== place) {
              await dispatch(updateItemPlace(item._id, place));
              toast.success("Place de l'article mis à jour");
            }
            handleClose();
          })
          .catch((err) => toast.error(err));
      } else {
        dispatch(
          createItem(
            removeNullInObject({
              title: newItem?.title,
              reference: newItem?.reference,
              price: parseInt(newItem?.price, 10),
              rental_price: parseInt(newItem?.rental_price, 10),
              commentary: newItem?.commentary,
              categories,
              brands,
              sizes,
              colors,
            }),
          ),
        )
          .then(async ({ response }) => {
            if (response) {
              const picturesToUpload = pictures?.filter((p) => !p._id);
              for await (const pic of picturesToUpload) {
                const body = new FormData();
                body.append('file', pic.path);
                await addItemsPicture(response?._id, body);
              }
            }
            setIsLoading(false);
            toast.success('Article ajouté');
            await dispatch(updateItemPlace(response._id, place));
            handleClose();
          })
          .catch((err) => toast.error(err));
      }
    }
  };

  if (!item) return <div />;
  return (
    <Modal show centered size="lg" onHide={() => null}>
      <Header>
        <h4>{isModify ? 'Modifier' : 'Ajouter'} un article</h4>
        <img src={'/x.svg'} alt={'close'} onClick={() => !isLoading && handleClose()} />
      </Header>
      <Content>
        <div style={{ marginBottom: '0px' }}>
          <h6>Nom:</h6>
          <Input
            value={newItem?.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h6>Référence:</h6>
          <Input
            value={newItem?.reference}
            onChange={(e) => setNewItem({ ...newItem, reference: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h6 style={{ margin: 0 }}>Masqué</h6>
          <Form.Check
            type="switch"
            id="custom-switch"
            label=""
            checked={newItem?.is_hidden}
            onChange={(e) => setNewItem({ ...newItem, is_hidden: e.target.checked })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h6>Prix neuf:</h6>
          <Input
            value={newItem?.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h6>Prix de location:</h6>
          <Input
            value={newItem?.rental_price}
            onChange={(e) => setNewItem({ ...newItem, rental_price: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h6>Reversé:</h6>
          <Input
            value={newItem?.reversal}
            onChange={(e) => setNewItem({ ...newItem, reversal: e.target.value })}
          />
        </div>
        {newItem?._id && (
          <div style={{ marginBottom: '20px' }}>
            <h6>Place: (min: 1 et max: {itemsLength - 1})</h6>
            <Input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              error={place < 1 || place >= itemsLength}
            />
          </div>
        )}
        <div style={{ marginBottom: '20px' }}>
          <h6>Commentaire :</h6>
          <Input
            value={newItem?.commentary}
            onChange={(e) => setNewItem({ ...newItem, commentary: e.target.value })}
          />
        </div>
        <div>
          <Filter>
            <Dropdown value={'Catégories'}>
              {hack?.categories
                ?.filter((c) => !categories?.includes(c))
                .map((category) => (
                  <p key={category} onClick={() => setCategories([...categories, category])}>
                    {category}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {categories.map((category) => (
                <Pin
                  key={category}
                  content={category}
                  onClose={() => setCategories((ca) => ca.filter((c) => c !== category))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Marques'}>
              {hack?.brands
                ?.filter((c) => !brands?.includes(c))
                .map((brand) => (
                  <p key={brand} onClick={() => setBrands([...brands, brand])}>
                    {brand}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {brands.map((brand) => (
                <Pin
                  key={brand}
                  content={brand}
                  onClose={() => setBrands((ca) => ca.filter((c) => c !== brand))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Tailles'}>
              {Object.keys(sizesOutfitsType)
                .filter((c) => !sizes?.includes(c))
                .map((size) => (
                  <p key={size} onClick={() => setSizes([...sizes, size])}>
                    {translation(`sizes.${size}`)}
                  </p>
                ))}
              {Object.keys(sizesShoesType)
                .filter((c) => !sizes?.includes(c))
                .map((size) => (
                  <p key={size} onClick={() => setSizes([...sizes, size])}>
                    {translation(`sizes.${size}`)}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {sizes.map((size) => (
                <Pin
                  key={size}
                  content={translation(`sizes.${size}`)}
                  onClose={() => setSizes((ca) => ca.filter((c) => c !== size))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Couleurs'}>
              {hack?.colors
                ?.filter((c) => !colors?.includes(c))
                .map((color) => (
                  <p key={color} onClick={() => setColors([...colors, color])}>
                    {color}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {colors.map((color) => (
                <Pin
                  key={color}
                  content={color}
                  onClose={() => setColors((ca) => ca.filter((c) => c !== color))}
                />
              ))}
            </PinsContainer>
          </Filter>
        </div>
        <div>
          <p>Photos de l&apos;article (5 maximum) :</p>

          <LayoutPictures>
            {pictures?.map((pic, index) => (
              <PictureContainer key={`pic_${index}`}>
                <img src={pic?._id ? pic.path : URL.createObjectURL(pic.path)} alt={pic.name} />

                <div className="option-picture">
                  <IconAndLabel
                    icon={imagesLinks.icons.delete}
                    onClick={() => {
                      if (pic._id) setPicturesToDelete((v) => [...v, pic._id]);
                      const pics = [...pictures];
                      pics.splice(index, 1);
                      setPictures(pics);
                    }}
                  >
                    Supprimer
                  </IconAndLabel>
                </div>
              </PictureContainer>
            ))}

            {pictures?.length < 5 && (
              <label htmlFor="file">
                <UploadLittle>
                  <p>Ajouter</p>
                  <span style={{ textAlign: 'center' }}>
                    .jpeg, .jpg, <br />
                    .png 3mo max
                  </span>
                </UploadLittle>
              </label>
            )}
          </LayoutPictures>

          <input
            id={'file'}
            style={{ visibility: 'hidden', position: 'absolute' }}
            type="file"
            name="file"
            onChange={uploadPicture}
          />
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h6>Ils aimeront aussi:</h6>
          <Input
            value={newItem?.related_items}
            onChange={(e) => setNewItem({ ...newItem, related_items: e.target.value })}
            placeholder={'id,id,...'}
          />
        </div>

        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button style={{ background: 'none' }} onClick={handleClose}>
            Fermer
          </Button>
          <Button
            disabled={
              !newItem?.title ||
              !categories?.length ||
              !brands?.length ||
              place < 1 ||
              place >= itemsLength
            }
            onClick={update}
            color={'white'}
            bgColor={'green'}
          >
            {isLoading && <Spinner />} {isModify ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </Content>
    </Modal>
  );
};

export default ModalCreateAndModifyItem;
