import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import FastImages from "../../../../components/FastImage";
import Header from "../../../../components/Header";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import {
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import ContentView from "./ContentView";
import styles from "./styles";

const SupportForumDetail = (props: any) => {
  const [contentView, setContentView] = useState<any>({});
  const [contentViewModal, setContentViewModal] = useState<any>(false);
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.supportforumDtlHeader}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightSecondIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <ScrollView>
        <View style={styles.mainCon}>
          <Text style={styles.titleTxt}>{props?.supportForumDtl?.title}</Text>
          <Text style={styles.descriptnTxt}>
            {props?.supportForumDtl?.description}
          </Text>
          <View style={styles.locationVw}>
            <Image source={images.locationIcon} style={styles.locationImg} />
            <Text style={styles.locationTxt}>
              {props?.supportForumDtl?.location}
            </Text>
          </View>
          {props?.supportForumDtl?.support_forum_content?.length > 0 ? (
            <View style={styles.demoImgView}>
              {props?.supportForumDtl?.support_forum_content?.map(
                (itm: any, indx: any) => {
                  return (
                    <View style={{ margin: 5 }}>
                      {itm?.content_type === "image" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setContentView({
                              content: itm?.content,
                              content_type: itm?.content_type,
                              support_forum_id: itm?.support_forum_id,
                            });
                            setContentViewModal(true);
                          }}
                        >
                          <FastImages
                            source={{
                              uri:
                                props?.supportForumDtl?.base_url + itm?.content,
                            }}
                            style={styles.Img}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  );
                }
              )}
            </View>
          ) : null}
          {props?.supportForumDtl?.support_forum_content?.length > 0 ? (
            <View style={styles.demoImgView}>
              {props?.supportForumDtl?.support_forum_content?.map(
                (itm: any, indx: any) => {
                  return (
                    <>
                      {itm?.video_thumbnail && itm?.content_type === "video" ? (
                        <View
                          style={{
                            marginVertical: normalizeSpacing(20),
                            margin: 5,
                          }}
                        >
                          <Image
                            source={{
                              uri:
                                props?.supportForumDtl?.base_url +
                                itm?.video_thumbnail,
                            }}
                            style={styles.Img}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setContentView(itm);
                              setContentViewModal(true);
                            }}
                            style={styles.playbtntch}
                          >
                            <Image
                              source={images.playbuttonIcon}
                              style={{ tintColor: WHITE_COLOR }}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </>
                  );
                }
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={{ marginBottom: 10 }}>
        <Button
          width={135}
          buttonText={strings.shareFiles}
          handleBtnPress={() => props.handleSharePress()}
        />
      </View>
      <ContentView
        Visible={contentViewModal}
        setIsVisible={setContentViewModal}
        contentData={contentView}
        setContentData={setContentView}
        url={props?.supportForumDtl?.base_url}
      />
    </View>
  );
};

export default SupportForumDetail;
