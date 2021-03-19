import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Settings,
  FormInput,
  FileInput,
  UploadFile,
  ErrorMessage,
  DropdownAlertService,
  FormSelect,
  FormSelectOption,
  TextHeader,
  cents,
  ax,
} from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import validationSchema from './validationSchema';
import { Sale, SaleProduct, SalePosition, Action } from 'modules/sales/store';
import SaleStatus from '../SaleStatus';
import SaleComments from '../SaleComments';
import styles from './styles';

interface Props {
  action: Action;
  sale?: Sale;
  onSuccess?: () => void;
}

const SaleForm: React.FC<Props> = ({ action, sale, onSuccess }) => {
  const { getActions, getSales } = useActions();
  const { user } = useSelector(state => state.profile);
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [productOptions, setProductOptions] = useState<FormSelectOption[]>([]);
  const [positions, setPositions] = useState<SalePosition[]>([]);
  const [planText, setPlanText] = useState<string>('');
  const [bonusesText, setBonusesText] = useState<string>('');
  const [document1, setDocument1] = useState<UploadFile | null>(null);
  const [document2, setDocument2] = useState<UploadFile | null>(null);
  const [document3, setDocument3] = useState<UploadFile | null>(null);
  const [document4, setDocument4] = useState<UploadFile | null>(null);
  const [document5, setDocument5] = useState<UploadFile | null>(null);

  useFocusEffect(React.useCallback(() => {
    // инициализация продажи
    if (sale) {
      setPositions(sale.positions);
      if (sale.documents[0]) {setDocument1(UploadFile.fromObject(sale.documents[0]));}
      if (sale.documents[1]) {setDocument2(UploadFile.fromObject(sale.documents[1]));}
      if (sale.documents[2]) {setDocument3(UploadFile.fromObject(sale.documents[2]));}
      if (sale.documents[3]) {setDocument4(UploadFile.fromObject(sale.documents[3]));}
      if (sale.documents[4]) {setDocument5(UploadFile.fromObject(sale.documents[4]));}
    }
    // установка продукции доступных опций
    ax().post('actions/api/action/view', { action_id: action.id })
      .then(response => {
        if (response.data?.action?.products) {
          const products: SaleProduct[] = response.data.action.products;
          const options: FormSelectOption[] = products.map((product) => {
            return {
              label: product.shortName ? product.shortName : product.name,
              value: `${product.id}`,
            };
          });
          setProducts(products);
          setProductOptions(options);
        }
      });
  }, [action.id, sale]));

  const profile_id = user?.profile_id;

  interface CalculateResponse {
    result: string;
    bonuses: {
      total: number;
      plan: number;
      fact: number;
      unit: string;
    };
  }

  // рассчет план-факта и бонусов
  const calculate = () => {
    if (positions.length === 0) {return;}
    const payload = {
      profile_id,
      action_id: action.id,
      sale_id: sale?.id,
      positions: positions.map(pos => ({
        product_id: pos.product_id,
        quantity: pos.quantity,
      })),
    };
    ax().post<CalculateResponse>('sales/api/bonus/calculate', payload)
      .then(response => {
        const { total, plan, fact, unit } = response.data.bonuses;
        setBonusesText(`Бонусы по акции: ${total}`);
        setPlanText(`План/факт: ${plan}/${fact} ${unit}`);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => calculate(), [positions]);

  // начальные значения формы
  const initialValues: any = {
    sold_on_local: sale ? sale.sold_on_local : '',
    number: sale ? sale.number : '',
    product_id: null,
  };

  return (
    <View style={styles.container}>
      <TextHeader>{action.title}</TextHeader>
      {sale ? <SaleStatus sale={sale}/> : null}

      <View style={styles.box}>
        <View style={styles.row}>
          <Text>{planText}</Text>
          <Text>{bonusesText}</Text>
        </View>

        <View style={styles.form}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              const documents = [];
              if (document1) {documents.push(document1.toArray());}
              if (document2) {documents.push(document2.toArray());}
              if (document3) {documents.push(document3.toArray());}
              if (document4) {documents.push(document4.toArray());}
              if (document5) {documents.push(document5.toArray());}

              const url = `sales/api/sale/${sale ? 'update' : 'create'}`;
              const payload = {
                profile_id,
                action_id: action.id,
                sale_id: sale?.id,
                number: values.number,
                sold_on_local: values.sold_on_local,
                documents,
                positions: positions.map(pos => ({
                  product_id: pos.product_id,
                  quantity: pos.quantity,
                })),
              };

              ax({ actions }).post(url, payload)
                .then(() => {
                  DropdownAlertService.alert('success', 'Регистрация продажи отправлена на проверку');
                  getSales();
                  getActions();
                  if (typeof onSuccess === 'function') {
                    onSuccess();
                  }
                })
                .catch(error => DropdownAlertService.alert('error', error));
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isValid, isSubmitting, status, setFieldValue }) => (
              <>
                {/* Позиции продажи */}
                {positions.length > 0 ? (
                  <View style={styles.positions}>
                    {positions.map(position => (
                      <View style={styles.position} key={`pos-${position.product_id}`}>
                        <View style={styles.productHeader}>
                          <Ionicons name="ios-bandage" style={styles.productIcon}/>
                          <Text style={styles.productName}>
                            {position?.product?.shortName
                              ? position?.product?.shortName
                              : position?.product?.name
                            }
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <View>
                            <Text style={styles.summaryLabel}>
                              Стоимость, руб.
                            </Text>
                            <Text style={styles.summary}>
                              {cents(position.quantity * position?.product?.price)}
                            </Text>
                          </View>
                          <View style={styles.controls}>
                            <TouchableOpacity onPress={() => {
                              if (position.quantity === 1) {return;}
                              const newPositions = positions.map(p => {
                                if (p.product_id === position.product_id) {
                                  p.quantity -= 1;
                                }
                                return p;
                              });
                              setPositions(newPositions);
                            }}
                            >
                              <Ionicons name="ios-remove" style={styles.minusPlus}/>
                            </TouchableOpacity>
                            <Text style={styles.qty}>{position.quantity}</Text>
                            <TouchableOpacity onPress={() => {
                              const newPositions = positions.map(p => {
                                if (p.product_id === position.product_id) {
                                  p.quantity += 1;
                                }
                                return p;
                              });
                              setPositions(newPositions);
                            }}
                            >
                              <Ionicons name="ios-add" style={styles.minusPlus}/>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              setPositions(positions.filter(p => p.product_id !== position.product_id));
                            }}
                          >
                            <Ionicons name="ios-trash-bin-outline" style={styles.remove}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Добавление позиции */}
                {productOptions.length > 0 ? (
                  <Field
                    component={FormSelect}
                    name="product_id"
                    label="Добавить продукцию"
                    iconName="ios-add-circle-outline"
                    options={productOptions}
                    disabled={productOptions.length === 0}
                    onChanged={(value: string) => {
                      const productId = parseInt(value, 10);
                      const product: SaleProduct | undefined = products.find(
                        p => p.id === productId,
                      );
                      if (!product) {return;}
                      const checkExist = positions.find(pos => pos.product_id == productId);
                      if (checkExist) {
                        DropdownAlertService.alert('error', 'Позиция уже добавлена!');
                        setFieldValue('product_id', null);
                        return;
                      }
                      const position: SalePosition = {
                        product: product,
                        product_id: product.id,
                        quantity: 1,
                        bonuses: product.price,
                      };
                      setPositions([...positions, position]);
                      setFieldValue('product_id', null);
                    }}
                  />
                ) : null}

                {/* Другие поля продажи */}
                {/*<Field*/}
                {/*  component={FormInput}*/}
                {/*  name="sold_on_local"*/}
                {/*  label="Дата продажи (дд.мм.гггг)"*/}
                {/*  iconName="ios-calendar-outline"*/}
                {/*  mask="99.99.9999"*/}
                {/*  keyboardType="numeric"*/}
                {/*  returnKeyType="done"*/}
                {/*/>*/}
                <Field
                  component={FormInput}
                  name="number"
                  label="Комментарий"
                  iconName="ios-chatbox-outline"
                  multiline={true}
                  numberOfLines={3}
                />

                {/* Фотографии */}
                <TextHeader>Фото или PDF копия чека</TextHeader>
                <FileInput
                  title="Фото чека №1"
                  file={document1}
                  setFile={file => setDocument1(file)}
                />
                {document1 || document2 ?
                  <FileInput
                    title="Фото чека №2"
                    file={document2}
                    setFile={file => setDocument2(file)}
                  />
                  : null
                }
                {document2 || document3 ?
                  <FileInput
                    title="Фото чека №3"
                    file={document3}
                    setFile={file => setDocument3(file)}
                  />
                  : null
                }
                {document3 || document4 ?
                  <FileInput
                    title="Фото чека №4"
                    file={document4}
                    setFile={file => setDocument4(file)}
                  />
                  : null
                }
                {document4 || document5 ?
                  <FileInput
                    title="Фото чека №5"
                    file={document5}
                    setFile={file => setDocument5(file)}
                  />
                  : null
                }

                {/* Оформление */}
                <ErrorMessage dot>{status}</ErrorMessage>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                    color={Settings.colors.primary}
                    icon={({ color }) => <Ionicons name="ios-paper-plane" size={24} color={color}/>}
                  >Отправить на проверку</Button>
                </View>
              </>
            )}
          </Formik>
        </View>

        {sale ? <SaleComments sale={sale}/> : null}
      </View>
    </View>
  );
};

export default SaleForm;
