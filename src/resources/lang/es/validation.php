<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ' :attribute debe ser aceptado.',
    'active_url'           => ' :attribute no es una URL válida.',
    'after'                => ' :attribute debe ser una fecha superior a :date.',
    'after_or_equal'       => ' :attribute debe ser una fecha superior o igual a :date.',
    'alpha'                => ' :attribute solo puede contener caracteres.',
    'alpha_dash'           => ' :attribute solo puede contener letras, números y guiones.',
    'alpha_num'            => ' :attribute solo puede contener letras y números.',
    'array'                => ' :attribute debe ser un Array.',
    'before'               => ' :attribute debe ser anterior a :date.',
    'before_or_equal'      => ' :attribute debe ser una fecha anterior o igual a :date.',
    'between'              => [
        'numeric' => ' :attribute debe estar entre :min y :max.',
        'file'    => ' :attribute debe estar entre :min y :max kilobytes.',
        'string'  => ' :attribute debe estar entre :min y :max caracteres.',
        'array'   => ' :attribute debe estar entre :min y :max elementos.',
    ],
    'boolean'              => ' :attribute debe ser verdadero o falso.',
    'confirmed'            => ' La confirmación de :attribute no coincide.',
    'date'                 => ' :attribute no es una fecha válida.',
    'date_format'          => ' :attribute no corresponde con el formato :format.',
    'different'            => ' :attribute y :other deben ser diferentes.',
    'digits'               => ' :attribute debe contener :digits digitos.',
    'digits_between'       => ' :attribute debe contener entre :min y :max digitos.',
    'dimensions'           => ' :attribute tiene unas dimensiones incorrectas.',
    'distinct'             => ' El campo :attribute tiene un valor duplicado.',
    'email'                => ' :attribute debe ser una dirección de correo correcta.',
    'exists'               => ' El/La :attribute seleccionado es invalido.',
    'file'                 => ' :attribute debe ser un fichero.',
    'filled'               => ' :attribute debe tener un valor.',
    'image'                => ' :attribute debe ser una imagen.',
    'in'                   => 'El/la :attribute seleccionado es inválido.',
    'in_array'             => ' :attribute no existe en :other.',
    'integer'              => ' :attribute debe ser un entero.',
    'ip'                   => ' :attribute debe ser una dirección IP válida.',
    'json'                 => ' :attribute debe ser una cadena JSON correcta.',
    'max'                  => [
        'numeric' => ' :attribute no debe ser mayor que :max.',
        'file'    => ' :attribute no debe ser mayor de :max kilobytes.',
        'string'  => ' :attribute no debe ser mayor de :max caracteres.',
        'array'   => ' :attribute no puede tener más de :max elementos.',
    ],
    'mimes'                => ' :attribute debe ser un fichero de tipo: :values.',
    'mimetypes'            => ' :attribute debe ser un fichero de tipo: :values.',
    'min'                  => [
        'numeric' => ' :attribute debe tener al menos :min.',
        'file'    => ' :attribute debe tener al menos :min kilobytes.',
        'string'  => ' :attribute debe tener al menos :min caracteres.',
        'array'   => ' :attribute tiene que tener al menos :min elementos.',
    ],
    'not_in'               => 'El/La :attribute seleccionado es inválido.',
    'numeric'              => ' :attribute debe ser un número.',
    'present'              => ' :attribute debe estar presente.',
    'regex'                => ' El formato de :attribute es invalido.',
    'required'             => ' :attribute es requerido.',
    'required_if'          => ' :attribute es requerido cuando :other es :value.',
    'required_unless'      => ' :attribute es requerido al menos que :other  este en :values.',
    'required_with'        => ' :attribute es requerido cuando :values esta presente.',
    'required_with_all'    => ' :attribute es requerido cuando :values esta presente.',
    'required_without'     => ' :attribute es requerido cuando :values no esta presente.',
    'required_without_all' => ' :attribute es requerido cuando ninguno de :values estan presentes.',
    'same'                 => ' :attribute y :other deben coincidir.',
    'size'                 => [
        'numeric' => ' :attribute debe ser :size.',
        'file'    => ' :attribute debe ser :size kilobytes.',
        'string'  => ' :attribute debe ser :size caracteres.',
        'array'   => ' :attribute debe contener :size elementos.',
    ],
    'string'               => ' :attribute debe ser una cadena de texto.',
    'timezone'             => ' :attribute debe ser una zona válida.',
    'unique'               => ' :attribute ya esta cogida.',
    'uploaded'             => ' Hubo un fallo al subir :attribute .',
    'url'                  => ' El formato de :attribute es inválido.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
