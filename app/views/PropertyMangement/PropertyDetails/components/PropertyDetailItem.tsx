import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  ROLE_IDS,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "app/components/utilities/Localization";
import FastImages from "app/components/FastImage";

const PropertyDetailItem = (props: any) => {
  const imagearray = props.propertydocument?.filter((el: any) => {
    const images = el.document_type == "image";
    return images;
  });
  const videoarray = props.propertydocument?.filter((el: any) => {
    const videos = el.document_type == "video";
    return videos;
  });
  const documentarray = props.propertydocument?.filter((el: any) => {
    const count = el.document_type == "document" || el.document_type == "";
    return count;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View style={styles.topView}>
        <View style={styles.topnameContainer}>
          <Text style={styles.nameTxt}>Total Flats :</Text>
          <Text style={styles.nameTxt}>200</Text>
        </View>
        <View style={[styles.topnameContainer, {justifyContent: 'flex-end'}]}>
          <Text style={styles.nameTxt}>Sold Out :</Text>
          <Text style={styles.nameTxt}>20</Text>
        </View>
      </View> */}
      {props.userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
      props.userData?.data?.role_id === ROLE_IDS.closingtl_id ||
      props.userData?.data?.role_id === ROLE_IDS.closing_head_id ||
      props.userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
      props.userData?.data?.role_id === ROLE_IDS.sitehead_id ||
      props.userData?.data?.role_id === ROLE_IDS.admin_id ||
      props.userData?.data?.role_id === ROLE_IDS.businesshead_id ? (
        <View style={styles.topBtnView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.handleInventoryPress()}
          >
            <Text style={styles.buttonTxt}>Available Inventory</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.status ? "Active" : "Deactive"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalVisitor} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_visitor}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalSiteVisit} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalCloseVisit} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.close_visit}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Cluster Name </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.area}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Type </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_type_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Start Date </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.start_date}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>End Date </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.end_date}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.configurations.map((configuration: any) => (
            <Text
              key={configuration.configuration_id}
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: "100%",
                },
              ]}
            >
              {configuration.configuration_title}/ Min -{" "}
              {configuration.min_rate}
              {configuration.min_rate_type}/ Max - {configuration.max_rate}
              {configuration.max_rate_type}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Amenities </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.amenity.map((amenity: any) => (
            <Text
              key={amenity._id}
              style={[
                styles.nameTxt,
                {
                  borderBottomColor: GRAY_COLOR,
                  borderBottomWidth: 1,
                  width: "100%",
                },
              ]}
            >
              {amenity.title}
            </Text>
          ))}

          {/* <Text
            key={imagearray._id}
            style={[
              styles.nameTxt,
              {
                borderBottomColor: GRAY_COLOR,
                borderBottomWidth: 1,
                width: "100%",
              },
            ]}
          >
            {props.items.amenity}
          </Text> */}
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Contents </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {imagearray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Images</Text>
              <View style={styles.ImageSliderContainer}>
                {imagearray.map((imagearray: any, index: any) =>
                  index <= 2 ? (
                    <FastImages
                      key={index}
                      loaderColor={BLACK_COLOR}
                      source={{
                        uri: `${props.items.base_url}${imagearray.document}`,
                      }}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("ImageContent", {
                      array: imagearray,
                      base_url: props.items.base_url,
                    })
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {videoarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Videos</Text>
              <View style={styles.ImageSliderContainer}>
                {videoarray.map((videos: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={
                        videos?.video_thumbnail
                          ? {
                              uri: `${props.items.base_url}${videos?.video_thumbnail}`,
                            }
                          : images.buildings
                      }
                      style={styles.imageSlider}
                    />
                  ) : null
                )}
                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("VideoContent", {
                      videoarray: videoarray,
                      base_url: props.items.base_url,
                    })
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {documentarray.length > 0 ? (
            <>
              <Text style={styles.nameTxt}>Catalogue</Text>
              <View style={styles.ImageSliderContainer}>
                {documentarray.map((documents: any, index: any) =>
                  index <= 2 ? (
                    <Image
                      key={index}
                      source={images.pdfIcone}
                      style={styles.imageSlider}
                    />
                  ) : null
                )}

                <TouchableOpacity
                  style={styles.shadowView}
                  onPress={() =>
                    props.onpresContent("CatalogueContent", {
                      array: documentarray,
                      base_url: props.items.base_url,
                    })
                  }
                >
                  <Image source={images.forwardArrow} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Facilities </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.pickup}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyDetailItem;
