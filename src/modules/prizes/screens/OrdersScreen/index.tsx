import React from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

import {
  TextHeader,
  StatusLabel,
  DownloadService,
  StatusBarDark,
  TextEmpty,
} from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import {
  CardItem,
  CatalogOrder,
  OrderedCard,
  Payment,
  ShopOrder,
  ShopOrderStatus,
  ShopPosition,
} from 'modules/prizes/store';
import styles from './styles';
import { profileIdSelector, tokenSelector } from 'modules/auth/store';

interface ICardItemDownload {
  cardItem: CardItem;
  ms_order_id: number;
  index: number;
}

const CardItemDownload: React.FC<ICardItemDownload> = ({ cardItem, ms_order_id, index }) => {
  const profile_id = useSelector(profileIdSelector);
  const accessToken = useSelector(tokenSelector);

  const download = async () => {
    const ms_card_id = cardItem.ms_card_id;
    const payload: any = { profile_id, ms_order_id, ms_card_id };
    const urlPath = `catalog/api-v3/cards/download-blob?${DownloadService.buildQuery(payload)}`;
    const fileName = `${cardItem.type}_${cardItem.nominal}_N${index}.pdf`;
    await DownloadService.download(urlPath, fileName, 'Сертификат загружен', accessToken);
  };

  return (
    <TouchableOpacity style={styles.cardDownloadBox} onPress={download}>
      <Ionicons name="md-download" style={styles.cardDownloadIcon}/>
      <Text style={styles.cardDownloadText}> #{index}</Text>
    </TouchableOpacity>
  );
};

const OrderedCardItem: React.FC<{orderedCard: OrderedCard, ms_order_id: number}> = ({ orderedCard, ms_order_id }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardRow}>
        <FastImage
          source={{ uri: orderedCard.image }}
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{orderedCard.card_title}</Text>
            <Text style={styles.cardQty}>x {orderedCard.qty}</Text>
          </View>
          <View>
            <Text style={styles.cardNominal}>{orderedCard.nominal} р.</Text>

            {orderedCard.cards && orderedCard.cards.length > 0 &&
            <View style={styles.cards}>
              {orderedCard.cards.map((card, index) =>
                <CardItemDownload cardItem={card} ms_order_id={ms_order_id} index={index + 1}
                  key={card.ms_card_id}
                />)}
            </View>
            }
          </View>
        </View>
      </View>
    </View>
  );
};

const CatalogOrderItem: React.FC<{catalogOrder: CatalogOrder}> = ({ catalogOrder }) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text>Заказ №{catalogOrder.ms_order_id}</Text>
        <Text>{catalogOrder.created_at.substring(0, 10)}</Text>
      </View>
      <View style={styles.orderCards}>
        <StatusLabel status={catalogOrder.status}>{catalogOrder.status_label}</StatusLabel>
        {catalogOrder.items.map((orderedCard: OrderedCard) =>
          <OrderedCardItem
            orderedCard={orderedCard}
            ms_order_id={catalogOrder.ms_order_id}
            key={`oc-${orderedCard.ms_card_id}`}
          />)}
      </View>
    </View>
  );
};

const PaymentItem: React.FC<{payment: Payment}> = ({ payment }) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text>Перевод №{payment.ms_payment_id}</Text>
        <Text>{payment.created_at.substring(0, 10)}</Text>
      </View>
      <View style={styles.orderCards}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{payment.type_label}</Text>
            <Text style={styles.cardQty}>{payment.parameters.phone_mobile}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardNominal}>{payment.amount} р.</Text>
            <StatusLabel status={payment.status}>{payment.status_label}</StatusLabel>
          </View>
        </View>
      </View>
    </View>
  );
};

function getShopStatusLabel(status: ShopOrderStatus): string {
  switch (status) {
    case 'new':
      return 'Заказ обрабатывается';
    case 'delivery':
      return 'Доставляется';
    case 'rollback':
      return 'Откат покупки';
    case 'completed':
      return 'Заказ доставлен';
    default:
      return status;
  }
}

const ShopOrderItem: React.FC<{order: ShopOrder}> = ({ order }) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text>Заказ №{order.order_id}</Text>
        <Text>{order.created.substring(0, 10)}</Text>
      </View>
      <View style={styles.orderCards}>
        <StatusLabel status={order.status}>
          {order.status_label || getShopStatusLabel(order.status)}
        </StatusLabel>
        {order.items.map((position: ShopPosition) =>
          <ShopPositionItem position={position} key={`sp-${position.id}`}/>)}
      </View>
    </View>
  );
};

const ShopPositionItem: React.FC<{position: ShopPosition}> = ({ position }) => {
  const product = position.product;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardRow}>
        <FastImage
          source={{ uri: product.picture_url }}
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.cardQty}>x {position.qty}</Text>
          </View>
          <View>
            <Text style={styles.cardNominal}>{position.price} р.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const OrdersScreen = () => {
  const { getCatalogOrders, getPayments, getShopOrders } = useActions();

  useFocusEffect(React.useCallback(() => {
    getCatalogOrders();
    getPayments();
    getShopOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  const { catalogOrders, payments, shopOrders } = useSelector(state => state.prizes);
  const noOrders = !catalogOrders.length && !payments.length && !shopOrders.length;

  return (
    <SafeAreaView>
      <StatusBarDark/>
      <ScrollView>
        <TextEmpty length={noOrders ? 0 : 1} text="Заказы не найдены"/>

        {shopOrders.length > 0 ? (
          <View style={styles.block}>
            <TextHeader>Товары</TextHeader>
            {shopOrders.map(order => <ShopOrderItem key={`so-${order.order_id}`}
              order={order}
            />)}
          </View>
        ) : null}

        {payments.length > 0 ? (
          <View style={styles.block}>
            <TextHeader>Переводы</TextHeader>
            <View>
              {payments.map(item =>
                <PaymentItem payment={item} key={`payment-${item.ms_payment_id}`}/>)}
            </View>
          </View>
        ) : null}

        {catalogOrders.length > 0 ? (
          <View style={styles.block}>
            <TextHeader>Сертификаты</TextHeader>
            <View>
              {catalogOrders.map(item =>
                <CatalogOrderItem catalogOrder={item} key={`order-${item.ms_order_id}`}/>)}
            </View>
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
