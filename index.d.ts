declare module 'distance_matrix_ai_webservice' {

  /**
   * Creates a Distance Matrix Ai client. The client object contains all the API methods.
   */
  export interface CreateClientOptions {
    /** API key (required, unless clientID and clientSecret provided). */
    key: string;
    /** Maps API for Work client ID. */
    clientId?: string;
    /** Maps API for Work client secret (a.k.a. private key). */
    clientSecret?: string;
    /** Maps API for Work channel. */
    channel?: string;
    /** Timeout in milliseconds. (Default: 60 * 1000 ms). */
    timeout?: number;
    /** Default language for all queries. */
    language?: Language;
    /** Rate options. */
    rate?: RateOptions;
    /** Retry options. */
    retryOptions?: RetryOptions;
  }
  /** Create a Distance Matrix Ai client, with Promise support. */
  export interface CreateClientOptionsWithPromise extends CreateClientOptions {
    /** Promise constructor */
    Promise: PromiseConstructor;
  }

  export interface RateOptions {
    /** Controls rate-limiting of requests. Maximum number of requests per period. (Default: 50). */
    limit?: number;
    /** Period for rate limit, in milliseconds. (Default: 1000 ms). */
    period?: number;
  }

  export interface RetryOptions {
    /** If a transient server error occurs, how long to wait before retrying the request, in milliseconds. (Default: 500 ms). */
    interval?: number;
  }

  export function createClient(options: CreateClientOptionsWithPromise): DistanceMatrixAiClientWithPromise;
  export function createClient(options: CreateClientOptions): DistanceMatrixAiClient;

  /**
  * A callback function, which is called asynchronously when an API method completes.
  * The callback is given either:
  *  - a successful `ClientResponse` object; or
  *  - an error, one of:
  *     - the string `"timeout"`; or
  *     - an error from the underlying `http` library; or
  *     - a `ClientResponse` whose status is not `OK`.
  *
  * API methods don't require a callback function, if you use the Promise API.
  */
  export type ResponseCallback<T> = (err: 'timeout' | ClientResponse<T>, response: ClientResponse<T>) => void;

  /**
  * The object given to the ResponseCallback, containing the HTTP status and headers, as well as the response JSON.
  */
  export interface ClientResponse<T> {
    /** The HTTP headers. */
    headers: { [index: string]: string };
    /** Deserialized JSON object for the API response. */
    json: T;
    /** The HTTP status. */
    status: number;
  }

  /** A handle that allows cancelling a request. */
  export interface RequestHandle<T> {
    /**
     * Cancels the request.
     * The ResponseCallback will not be invoked, and promises will not be settled.
     * Use the RequestHandle#finally handler will still be called.
     */
    cancel(): void;
    /**
     * Registers a callback that will be called when the response is finished, either successfully, or with an error,
     * or having been cancelled. Use this to clean up resources.
     * Returns this handle, for chaining.
     */
    finally(callback: () => void): RequestHandle<T>;
  }

  /** A handle that allows cancelling a request, or obtaining a Promise. */
  export interface RequestHandleWithPromise<T> extends RequestHandle<T> {
    /**
     * Returns the response as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * This method is only available if you supplied the `Promise` constructor to the `createClient()` method when you constructed
     * the client object.
     */
    asPromise(): Promise<ClientResponse<T>>;
  }

  export type LatLngArray = [number, number];

  export type LatLngString = string;

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export interface LatLngLiteralVerbose {
    latitude: number;
    longitude: number;
  }

  /**
  * A latitude, longitude pair. The API methods accept either:
  *  - a two-item array of [latitude, longitude];
  *  - a comma-separated string;
  *  - an object with 'lat', 'lng' properties; or
  *  - an object with 'latitude', 'longitude' properties.
  */
  export type LatLng = (
    LatLngArray |
    LatLngString |
    LatLngLiteral |
    LatLngLiteralVerbose
  );

  /** The bounds parameter defines the latitude/longitude coordinates of the southwest and northeast corners of this bounding box. */
  export interface LatLngBounds {
    northeast: LatLngLiteral;
    southwest: LatLngLiteral;
  }

  /**
  * By default the API will attempt to load the most appropriate language based on the users location or browser settings.
  * Some APIs allow you to explicitly set a language when you make a request
  *
  * @see https://developers.google.com/maps/faq#languagesupport
  */
  export type Language = (
    /** Arabic */
    'ar' |
    /** Belarusian */
    'be' |
    /** Bulgarian */
    'bg' |
    /** Bengali */
    'bn' |
    /** Catalan */
    'ca' |
    /** Czech */
    'cs' |
    /** Danish */
    'da' |
    /** German */
    'de' |
    /** Greek */
    'el' |
    /** English */
    'en' |
    /** English (Australian) */
    'en-Au' |
    /** English (Great Britain) */
    'en-GB' |
    /** Spanish */
    'es' |
    /** Basque */
    'eu' |
    /** Farsi */
    'fa' |
    /** Finnish */
    'fi' |
    /** Filipino */
    'fil' |
    /** French */
    'fr' |
    /** Galician */
    'gl' |
    /** Gujarati */
    'gu' |
    /** Hindi */
    'hi' |
    /** Croatian */
    'hr' |
    /** Hungarian */
    'hu' |
    /** Indonesian */
    'id' |
    /** Italian */
    'it' |
    /** Hebrew */
    'iw' |
    /** Japanese */
    'ja' |
    /** Kazakh */
    'kk' |
    /** Kannada */
    'kn' |
    /** Korean */
    'ko' |
    /** Kyrgyz */
    'ky' |
    /** Lithuanian */
    'lt' |
    /** Latvian */
    'lv' |
    /** Macedonian */
    'mk' |
    /** Malayalam */
    'ml' |
    /** Marathi */
    'mr' |
    /** Burmese */
    'my' |
    /** Dutch */
    'nl' |
    /** Norwegian */
    'no' |
    /** Punjabi */
    'pa' |
    /** Polish */
    'pl' |
    /** Portuguese */
    'pt' |
    /** Portuguese (Brazil) */
    'pt-BR' |
    /** Portuguese (Portugal) */
    'pt-PT' |
    /** Romanian */
    'ro' |
    /** Russian */
    'ru' |
    /** Slovak */
    'sk' |
    /** Slovenian */
    'sl' |
    /** Albanian */
    'sq' |
    /** Serbian */
    'sr' |
    /** Swedish */
    'sv' |
    /** Tamil */
    'ta' |
    /** Telugu */
    'te' |
    /** Thai */
    'th' |
    /** Tagalog */
    'tl' |
    /** Turkish */
    'tr' |
    /** Ukrainian */
    'uk' |
    /** Uzbek */
    'uz' |
    /** Vietnamese */
    'vi' |
    /** Chinese (Simlified) */
    'zh-CN' |
    /** Chinese (Traditional) */
    'zh-TW'
  );

  export type DistanceMatrixAiClientEndpoint<Request, Response> = (query: Request, callback?: ResponseCallback<Response>) => RequestHandle<Response>;
  export type DistanceMatrixAiClientEndpointWithPromise<Request, Response> = (query: Request, callback?: ResponseCallback<Response>) => RequestHandleWithPromise<Response>;

  /**
  * Google Maps clieant that provides access to all the APIs.
  */
  export interface DistanceMatrixAiClient {
    /**
     * The Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations.
     * The API returns information based on the recommended route between start and end points, as calculated by the Google Maps API,
     * and consists of rows containing duration and distance values for each pair.
     */
    distanceMatrix: DistanceMatrixAiClientEndpoint<DistanceMatrixRequest, DistanceMatrixResponse>;
  }

  /**
  * Google Maps clieant that provides access to all the APIs. This supports the `asPromise()` function on API calls.
  */
  export interface DistanceMatrixAiClientWithPromise {
    /**
     * The Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations.
     * The API returns information based on the recommended route between start and end points, as calculated by the Google Maps API,
     * and consists of rows containing duration and distance values for each pair.
     *
     * @see https://developers.google.com/maps/documentation/distance-matrix/intro
     */
    distanceMatrix: DistanceMatrixAiClientEndpointWithPromise<DistanceMatrixRequest, DistanceMatrixResponse>;
  }

  /**
  * When you calculate directions, you may specify the transportation mode to use.
  * By default, directions are calculated as `driving` directions.
  *
  * **Note:** Both walking and bicycling directions may sometimes not include clear pedestrian or bicycling paths,
  * so these directions will return warnings in the returned result which you must display to the user.
  */
  export type TravelMode = (
    /** (default) indicates standard driving directions using the road network. */
    'driving' |
    /** requests walking directions via pedestrian paths & sidewalks (where available). */
    'walking' |
    /** requests bicycling directions via bicycle paths & preferred streets (where available). */
    'bicycling' |
    /**
     * requests directions via public transit routes (where available).
     * If you set the mode to transit, you can optionally specify either a departure_time or an arrival_time.
     * If neither time is specified, the departure_time defaults to now (that is, the departure time defaults to the current time).
     * You can also optionally include a transit_mode and/or a transit_routing_preference.
     */
    'transit'
  );

  export type TravelRestriction = (
    /** indicates that the calculated route should avoid toll roads/bridges. */
    'tolls' |
    /** indicates that the calculated route should avoid highways. */
    'highways' |
    /** indicates that the calculated route should avoid ferries. */
    'ferries' |
    /**
     * indicates that the calculated route should avoid indoor steps for walking and transit directions.
     * Only requests that include an API key or a Google Maps APIs Premium Plan client ID will receive indoor steps by default.
     */
    'indoor'
  );

  /**
  * Directions results contain text within distance fields that may be displayed to the user to indicate the distance of
  * a particular "step" of the route. By default, this text uses the unit system of the origin's country or region.
  */
  export type UnitSystem = (
    /** specifies usage of the metric system. Textual distances are returned using kilometers and meters. */
    'metric' |
    /** specifies usage of the Imperial (English) system. Textual distances are returned using miles and feet. */
    'imperial'
  );

  export type TrafficModel = (
    /**
     * indicates that the returned `duration_in_traffic` should be the best estimate of travel time given what is known about
     * both historical traffic conditions and live traffic. Live traffic becomes more important the closer the `departure_time` is to now.
     */
    'best_guess' |
    /**
     * indicates that the returned `duration_in_traffic` should be longer than the actual travel time on most days,
     * though occasional days with particularly bad traffic conditions may exceed this value.
     */
    'pessimistic' |
    /**
     * indicates that the returned `duration_in_traffic` should be shorter than the actual travel time on most days,
     * though occasional days with particularly good traffic conditions may be faster than this value.
     */
    'optimistic'
  );

  export type TransitMode = (
    /** indicates that the calculated route should prefer travel by bus. */
    'bus' |
    /** indicates that the calculated route should prefer travel by subway. */
    'subway' |
    /** indicates that the calculated route should prefer travel by train. */
    'train' |
    /** indicates that the calculated route should prefer travel by tram and light rail. */
    'tram' |
    /**
     * indicates that the calculated route should prefer travel by train, tram, light rail, and subway.
     * This is equivalent to `transit_mode=train|tram|subway`
     */
    'rail'
  );

  export type TransitRoutingPreference = (
    /** indicates that the calculated route should prefer limited amounts of walking. */
    'less_walking' |
    /** indicates that the calculated route should prefer a limited number of transfers. */
    'fewer_transfers'
  );

  export interface TransitFare {
    /** An [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) indicating the currency that the amount is expressed in. */
    currency: string;
    /** The total fare amount, in the currency specified above. */
    value: number;
    /** The total fare amount, formatted in the requested language. */
    text: string;
  }

  export interface Distance {
    /** indicates the distance in meters. */
    value: number;
    /**
     * contains a human-readable representation of the distance, displayed in units as used at the origin
     * (or as overridden within the `units` parameter in the request).
     * (For example, miles and feet will be used for any origin within the United States.)
     */
    text: string;
  }

  export interface Duration {
    /** indicates the duration in seconds. */
    value: number;
    /** contains a human-readable representation of the duration. */
    text: string;
  }

  export interface Time {
    /** the time specified as a JavaScript `Date` object. */
    value: Date;
    /** the time specified as a string. The time is displayed in the time zone of the transit stop. */
    text: string;
    /**
     * contains the time zone of this station. The value is the name of the time zone as defined in the
     * [IANA Time Zone Database](http://www.iana.org/time-zones), e.g. "America/New_York".
     */
    time_zone: string;
  }

  export interface DistanceMatrixRequest {
    /**
     * The starting point for calculating travel distance and time.
     * You can supply one or more locations separated by the pipe character (`|`), in the form of an address, latitude/longitude coordinates,
     * or a place ID:
     *  - If you pass an address, the service geocodes the string and converts it to a latitude/longitude coordinate to calculate distance.
     *    This coordinate may be different from that returned by the Geocoding API, for example a building entrance rather than its center.
     *
     *    `origins=Bobcaygeon+ON|24+Sussex+Drive+Ottawa+ON`
     *
     *  - If you pass latitude/longitude coordinates, they are used unchanged to calculate distance.
     *    Ensure that no space exists between the latitude and longitude values.
     *
     *    `origins=41.43206,-81.38992|-33.86748,151.20699`
     *
     *  - If you supply a place ID, you must prefix it with `place_id:`.
     *    You can only specify a place ID if the request includes an API key or a Google Maps APIs Premium Plan client ID.
     *    You can retrieve place IDs from the Geocoding API and the Places SDK (including Place Autocomplete).
     *
     *    `origins=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`
     *
     *  - Alternatively, you can supply an encoded set of coordinates using the
     *    [Encoded Polyline Algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm).
     *    This is particularly useful if you have a large number of origin points, because the URL is significantly shorter when using
     *    an encoded polyline.
     *
     *     - Encoded polylines must be prefixed with `enc:` and followed by a colon (`:`). For example: `origins=enc:gfo}EtohhU:`
     *     - You can also include multiple encoded polylines, separated by the pipe character (`|`).
     *       For example: `origins=enc:wc~oAwquwMdlTxiKtqLyiK:|enc:c~vnAamswMvlTor@tjGi}L:|enc:udymA{~bxM:`
     */
    origins: LatLng[];
    /**
     * One or more locations to use as the finishing point for calculating travel distance and time.
     * The options for the destinations parameter are the same as for the origins parameter, described above.
     */
    destinations: LatLng[];
    /**
     * Specifies the mode of transport to use when calculating distance.
     * Valid values and other request details are specified in the Travel Modes section of this document.
     *
     * @default TravelMode.driving
     */
    mode?: TravelMode;
    /**
     * The language in which to return results.
     *  - If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header,
     *    or the native language of the domain from which the request is sent.
     *  - The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal,
     *    it returns street addresses in the local language, transliterated to a script readable by the user if necessary,
     *    observing the preferred language. All other addresses are returned in the preferred language.
     *    Address components are all returned in the same language, which is chosen from the first component.
     *  - If a name is not available in the preferred language, the API uses the closest match.
     *  - The preferred language has a small influence on the set of results that the API chooses to return,
     *    and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
     *    such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
     *    For example, utca and tér are synonyms for street in Hungarian.
     */
    language?: string;
    /**
     * The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/CcTLD) (country code top-level domain) two-character value.
     * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
     * This parameter will only influence, not fully restrict, results from the geocoder.
     * If more relevant results exist outside of the specified region, they may be included.
     */
    region?: string;
    /**
     * Introduces restrictions to the route. Valid values are specified in the Restrictions section of this document.
     * Only one restriction can be specified.
     */
    avoid?: TravelRestriction[];
    /** Specifies the unit system to use when expressing distance as text. */
    units?: UnitSystem;
    /**
     * Specifies the desired time of arrival for transit requests, in seconds since midnight, January 1, 1970 UTC.
     * You can specify either `departure_time` or `arrival_time`, but not both.
     * Note that `arrival_time` must be specified as an integer.
     */
    arrival_time?: Date | number;
    /**
     * The desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
     * Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).
     *
     * The departure time may be specified in two cases:
     *
     *  - For requests where the travel mode is transit: You can optionally specify one of `departure_time` or `arrival_time`.
     *    If neither time is specified, the `departure_time` defaults to now (that is, the departure time defaults to the current time).
     *
     *  - For requests where the travel mode is driving: You can specify the `departure_time` to receive a route and trip duration
     *    (response field: `duration_in_traffic`) that take traffic conditions into account.
     *    This option is only available if the request contains a valid API key, or a valid
     *    Google Maps APIs Premium Plan client ID and signature.
     *    The `departure_time` must be set to the current time or some time in the future. It cannot be in the past.
     *
     *    **Note:** Distance Matrix requests specifying `departure_time` when `mode=driving` are limited
     *    to a maximum of 100 elements per request. The number of origins times the number of destinations defines the number of elements.
     */
    departure_time?: Date | number;
    /**
     * Specifies the assumptions to use when calculating time in traffic.
     * This setting affects the value returned in the `duration_in_traffic` field in the response,
     * which contains the predicted time in traffic based on historical averages.
     * The `traffic_model` parameter may only be specified for requests where the travel mode is `driving`,
     * and where the request includes a `departure_time`, and only if the request includes an API key or
     * a Google Maps APIs Premium Plan client ID.
     *
     * @default TrafficModel.best_guess
     */
    traffic_model?: TrafficModel;
    /** Specifies one or more preferred modes of transit. This parameter may only be specified for requests where the `mode` is `transit`. */
    transit_mode?: TransitMode[];
    /**
     * Specifies preferences for transit requests. Using this parameter, you can bias the options returned,
     * rather than accepting the default best route chosen by the API.
     * This parameter may only be specified for requests where the `mode` is `transit`.
     */
    transit_routing_preference?: TransitRoutingPreference;
  }

  export interface DistanceMatrixResponse {
    /** contains metadata on the request. See Status Codes below. */
    status: DistanceMatrixResponseTopLevelStatus;
    /**
     * When the top-level status code is other than `OK`, this field contains more detailed information
     * about the reasons behind the given status code.
     */
    error_message: string;
    /**
     * contains an array of addresses as returned by the API from your original request.
     * These are formatted by the geocoder and localized according to the language parameter passed with the request.
     */
    origin_addresses: string[];
    /**
     * contains an array of addresses as returned by the API from your original request.
     * As with origin_addresses, these are localized if appropriate.
     */
    destination_addresses: string[];
    /** contains an array of elements, which in turn each contain a status, duration, and distance element. */
    rows: DistanceMatrixRow[];
  }

  /**
  * The status fields within the response object contain the status of the request, and may contain useful debugging information.
  * The Distance Matrix API returns a top-level status field, with information about the request in general,
  * as well as a status field for each element field, with information about that particular origin-destination pairing.
  */
  export type DistanceMatrixResponseTopLevelStatus = (
    /** indicates the response contains a valid result. */
    'OK' |
    /** indicates that the provided request was invalid. */
    'INVALID_REQUEST' |
    /** indicates that the product of origins and destinations exceeds the per-query limit. */
    'MAX_ELEMENTS_EXCEEDED' |
    /**
     * indicates any of the following:
     *  - The API key is missing or invalid.
     *  - Billing has not been enabled on your account.
     *  - A self-imposed usage cap has been exceeded.
     *  - The provided method of payment is no longer valid (for example, a credit card has expired).
     * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.
     */
    'OVER_DAILY_LIMIT' |
    /** indicates the service has received too many requests from your application within the allowed time period. */
    'OVER_QUERY_LIMIT' |
    /** indicates that the service denied use of the Distance Matrix service by your application. */
    'REQUEST_DENIED' |
    /** indicates a Distance Matrix request could not be processed due to a server error. The request may succeed if you try again. */
    'UNKNOWN_ERROR'
  );

  export type DistanceMatrixResponseElementLevelStatus = (
    /** indicates the response contains a valid result. */
    'OK' |
    /** indicates that the origin and/or destination of this pairing could not be geocoded. */
    'NOT_FOUND' |
    /** indicates no route could be found between the origin and destination. */
    'ZERO_RESULTS' |
    /** indicates the requested route is too long and cannot be processed. */
    'MAX_ROUTE_LENGTH_EXCEEDED'
  );

  /**
  * When the Distance Matrix API returns results, it places them within a JSON `rows` array.
  * Even if no results are returned (such as when the origins and/or destinations don't exist), it still returns an empty array.
  * XML responses consist of zero or more `<row>` elements.
  *
  * Rows are ordered according to the values in the `origin` parameter of the request.
  * Each row corresponds to an origin, and each `element` within that row corresponds to a pairing of the origin with a `destination` value.
  *
  * Each `row` array contains one or more `element` entries, which in turn contain the information about a single origin-destination pairing.
  */
  export interface DistanceMatrixRow {
    elements: DistanceMatrixRowElement[];
  }

  /** The information about each origin-destination pairing is returned in an `element` entry. */
  export interface DistanceMatrixRowElement {
    /** possible status codes  */
    status: DistanceMatrixResponseElementLevelStatus;
    /**
     * The length of time it takes to travel this route, expressed in seconds (the `value` field) and as `text`.
     * The textual representation is localized according to the query's `language` parameter.
     */
    duration: Duration;
    /**
     * The length of time it takes to travel this route, based on current and historical traffic conditions.
     * See the `traffic_model` request parameter for the options you can use to request that the returned value is
     * `optimistic`, `pessimistic`, or a `best-guess` estimate. The duration is expressed in seconds (the `value` field) and as `text`.
     * The textual representation is localized according to the query's `language` parameter.
     * The duration in traffic is returned only if all of the following are true:
     *  - The request includes a `departure_time` parameter.
     *  - The request includes a valid API key, or a valid Google Maps APIs Premium Plan client ID and signature.
     *  - Traffic conditions are available for the requested route.
     *  - The `mode` parameter is set to `driving`.
     */
    duration_in_traffic: Duration;
    /**
     * The total distance of this route, expressed in meters (`value`) and as `text`.
     * The textual value uses the `unit` system specified with the unit parameter of the original request, or the origin's region.
     */
    distance: Distance;
    /**
     * If present, contains the total fare (that is, the total ticket costs) on this route.
     * This property is only returned for transit requests and only for transit providers where fare information is available.
     */
    fare: TransitFare;
  }
}